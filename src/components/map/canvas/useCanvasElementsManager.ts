import { useMemo } from "react";
import mapData from "@/lib/map/mapData";
import RBush, { BBox } from "rbush";
import mapConfig from "@/lib/map/mapConfig";
import {
  LabelDataWithPath,
  MapData,
  NormalizedValue,
  PixelValue,
  Point,
  Room,
  RoomDataWithPath,
  RoomTreeNode,
  Size,
} from "@/lib/types";
import { toPixels } from "@/lib/utils";

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
function getRoomDimensions(room: Room) {
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

  const result = roomPaths.filter((path) => foundRoomIds.includes(path.id));
  return result;
}

type WrappedText = {
  lines: string[];
  size: Size;
};

function createWrappedText(
  text: string,
  maxLineWidth: NormalizedValue,
  labelTextSize: PixelValue
): WrappedText {
  function estimateTextWidth(text: string): PixelValue {
    const getCharWidthRatio = (size: number) => {
      if (size <= 10) return 0.5;
      if (size <= 14) return 0.55;
      if (size <= 18) return 0.6;
      return 0.65;
    };
    const charWidthRatio = getCharWidthRatio(labelTextSize);
    const spaceWidth = labelTextSize * charWidthRatio * 0.5;
    const charWidth = labelTextSize * charWidthRatio;
    const spaceCount = (text.match(/\s/g) || []).length;
    const nonSpaceCharCount = text.replace(/\s/g, "").length;
    return nonSpaceCharCount * charWidth + spaceCount * spaceWidth;
  }

  const maxWidthPx = maxLineWidth; // Direct use of provided max width
  const words = text.split(/\s+/); // Split on any whitespace
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testLineWidth = estimateTextWidth(testLine);

    if (testLineWidth <= maxWidthPx) {
      // If line still fits, add word
      currentLine = testLine;
    } else {
      // If line doesn't fit, start new line
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }

  // Add last line
  if (currentLine) {
    lines.push(currentLine);
  }

  return {
    lines,
    size: {
      width: maxWidthPx,
      height: labelTextSize * lines.length,
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
  padding: PixelValue
): LabelGeometry {
  const [xOffset, yOffset] = labelOffset ?? [0, 0];

  const rectX =
    toPixels(center.x + xOffset, cellSize) -
    wrappedText.size.width / 2 -
    padding;
  const rectY =
    toPixels(center.y + yOffset, cellSize) -
    wrappedText.size.height / 2 -
    padding;
  const rectWidth = wrappedText.size.width + 2 * padding;
  const rectHeight = wrappedText.size.height + 2 * padding;

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
    padding: PixelValue;
    maxLineWidth: NormalizedValue;
    textSize: PixelValue;
  }
): LabelDataWithPath[] {
  return roomPaths.map((roomPath) => {
    const wrappedText = createWrappedText(
      roomPath.label,
      config.maxLineWidth,
      config.textSize
    );

    const geometry = createLabelGeometry(
      roomPath.center,
      roomPath.labelOffset,
      wrappedText,
      cellSize,
      config.padding
    );

    const offset = roomPath.labelOffset;

    return {
      lines: wrappedText.lines,
      element: geometry.path,
      roomId: roomPath.id,
      size: geometry.size,
      center: geometry.center,
      offset: offset ? { x: offset[0], y: offset[1] } : undefined,
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
  const { labelPadding, labelMaxLineWidth, labelTextSize } = mapConfig;

  const mapElements = useMemo(() => {
    const roomPaths = createRoomPaths(currentCellSize, mapData);
    const roomLabels = createLabels(roomPaths, currentCellSize, {
      padding: labelPadding,
      textSize: labelTextSize,
      maxLineWidth: labelMaxLineWidth,
    });
    return { roomPaths, roomLabels };
  }, [currentCellSize, labelMaxLineWidth, labelPadding, labelTextSize]);

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
