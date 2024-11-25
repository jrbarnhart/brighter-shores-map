import { useMemo } from "react";
import mapData, { MapData, RoomData, RoomId } from "@/lib/map/mapData";
import RBush, { BBox } from "rbush";
import { RoomTreeNode } from "./useCreateRTree";
import mapConfig from "@/lib/map/mapConfig";
import { NormalizedValue, PixelValue, Point, Size } from "@/lib/generalTypes";
import { toPixels } from "@/lib/utils";

export type RoomDataWithPath = RoomData & {
  element: Path2D;
  center: { x: number; y: number };
  size: { height: number; width: number };
};

export type LabelDataWithPath = {
  lines: string[];
  element: Path2D;
  roomId: RoomId;
  center: { x: number; y: number };
  size: { height: number; width: number };
};

function createCanvasPath2D(
  path: [number, number][],
  origin: [number, number],
  cellSize: number
) {
  const path2D = new Path2D();

  if (path.length === 0) return path2D;

  // Multiply startX/Y by cell size
  const startX = (path[0][0] + origin[0]) * cellSize;
  const startY = (path[0][1] + origin[1]) * cellSize;

  path2D.moveTo(startX, startY);

  for (let i = 1; i < path.length; i++) {
    const x = (path[i][0] + origin[0]) * cellSize;
    const y = (path[i][1] + origin[1]) * cellSize;
    path2D.lineTo(x, y);
  }

  path2D.closePath();
  return path2D;
}

// Finds centers of rooms on a normalized grid with origin 0,0
function getRoomDimensions(room: RoomData) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const vertex of room.path) {
    // Adjust position for room origin
    const absoluteX = room.origin[0] + vertex[0];
    const absoluteY = room.origin[1] + vertex[1];

    if (absoluteX < minX) minX = absoluteX;
    if (absoluteX > maxX) maxX = absoluteX;
    if (absoluteY < minY) minY = absoluteY;
    if (absoluteY > maxY) maxY = absoluteY;
  }

  const center = { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
  const width = maxX - minX;
  const height = maxY - minY;
  const size = { height, width };
  return { center, size };
}

function createRoomPaths(currentCellSize: number, mapData: MapData) {
  const roomPaths: RoomDataWithPath[] = [];
  for (const region of Object.values(mapData.regions)) {
    for (const room of region.rooms) {
      const { center, size } = getRoomDimensions(room);
      const roomPath = {
        element: createCanvasPath2D(room.path, room.origin, currentCellSize),
        center,
        size,
        ...room,
      };
      roomPaths.push(roomPath);
    }
  }
  return roomPaths;
}

function filterVisibleRooms(
  roomPaths: RoomDataWithPath[],
  roomsCanvas: HTMLCanvasElement | null,
  currentCellSize: number,
  mapPos: { x: number; y: number },
  rTree: RBush<RoomTreeNode> | undefined
) {
  if (!roomsCanvas || !rTree) return [];
  // Convert canvas dimensions to normalized cell space
  const canvasWidthInCells = roomsCanvas.width / currentCellSize;
  const canvasHeightInCells = roomsCanvas.height / currentCellSize;

  const bbox: BBox = {
    minX: mapPos.x,
    minY: mapPos.y,
    maxX: mapPos.x + canvasWidthInCells,
    maxY: mapPos.y + canvasHeightInCells,
  };

  const foundRoomIds = rTree.search(bbox).map((foundNode) => foundNode.roomId);

  const result = roomPaths.filter((path) =>
    foundRoomIds.includes(path.id as RoomId)
  );
  return result;
}

type WrappedText = {
  lines: string[];
  size: Size;
};

function createWrappedText(
  text: string,
  cellSize: number,
  maxLineWidth: NormalizedValue,
  lineHeight: PixelValue
): WrappedText {
  const maxWidthPx = toPixels(maxLineWidth, cellSize);

  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";
  let maxLineWidthPx = 0;

  words.forEach((word, index) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidthPx = toPixels(testLine.length, cellSize);

    if (testWidthPx <= maxWidthPx || words.length === 1 || index === 0) {
      currentLine = testLine;
    } else {
      lines.push(currentLine);
      maxLineWidthPx = Math.max(
        maxLineWidthPx,
        toPixels(currentLine.length, cellSize)
      );
      currentLine = word;
    }
  });

  if (currentLine) {
    lines.push(currentLine);
    maxLineWidthPx = Math.max(
      maxLineWidthPx,
      toPixels(currentLine.length, cellSize)
    );
  }

  return {
    lines,
    size: {
      width: Math.min(maxWidthPx, maxLineWidthPx),
      height: lineHeight * lines.length,
    },
  };
}

type LabelGeometry = {
  path: Path2D;
  size: Size;
  center: Point;
};

function createLabelGeometry(
  center: Point,
  labelOffset: [NormalizedValue, NormalizedValue] | undefined,
  wrappedText: WrappedText,
  cellSize: number,
  padding: NormalizedValue
): LabelGeometry {
  const [xOffset, yOffset] = labelOffset ?? [0, 0];
  const paddingPx = toPixels(padding, cellSize);

  const rectX =
    toPixels(center.x + xOffset, cellSize) -
    wrappedText.size.width / 2 -
    paddingPx;
  const rectY =
    toPixels(center.y + yOffset, cellSize) -
    wrappedText.size.height / 2 -
    paddingPx;
  const rectWidth = wrappedText.size.width + 2 * paddingPx;
  const rectHeight = wrappedText.size.height + 2 * paddingPx;

  const path = new Path2D();
  path.roundRect(rectX, rectY, rectWidth, rectHeight, 6);

  return {
    path,
    size: { width: rectWidth, height: rectHeight },
    center,
  };
}

function createLabels(
  roomPaths: RoomDataWithPath[],
  cellSize: number,
  config: {
    padding: NormalizedValue;
    maxLineWidth: NormalizedValue;
    lineHeight: PixelValue;
  }
): LabelDataWithPath[] {
  return roomPaths.map((roomPath) => {
    const wrappedText = createWrappedText(
      roomPath.label,
      cellSize,
      config.maxLineWidth,
      config.lineHeight
    );

    const geometry = createLabelGeometry(
      roomPath.center,
      roomPath.labelOffset,
      wrappedText,
      cellSize,
      config.padding
    );

    return {
      lines: wrappedText.lines,
      element: geometry.path,
      roomId: roomPath.id as RoomId,
      size: geometry.size,
      center: geometry.center,
    };
  });
}

export default function useCanvasElementsManager({
  currentCellSize,
  roomsCanvas,
  mapPos,
  rTree,
}: {
  roomsCanvas: HTMLCanvasElement | null;
  currentCellSize: number;
  mapPos: { x: number; y: number };
  rTree: RBush<RoomTreeNode> | undefined;
}) {
  const { labelPadding, labelLineHeight, labelMaxLineWidth } = mapConfig;

  const mapElements = useMemo(() => {
    const roomPaths = createRoomPaths(currentCellSize, mapData);
    const roomLabels = createLabels(roomPaths, currentCellSize, {
      padding: labelPadding,
      lineHeight: labelLineHeight,
      maxLineWidth: labelMaxLineWidth,
    });
    return { roomPaths, roomLabels };
  }, [currentCellSize, labelLineHeight, labelMaxLineWidth, labelPadding]);

  const { roomPaths, roomLabels } = mapElements;

  const visibleRoomPaths = useMemo(() => {
    return filterVisibleRooms(
      roomPaths,
      roomsCanvas,
      currentCellSize,
      mapPos,
      rTree
    );
  }, [currentCellSize, roomPaths, mapPos, rTree, roomsCanvas]);

  return { roomPaths, visibleRoomPaths, roomLabels };
}
