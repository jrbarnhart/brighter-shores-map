import { useMemo } from "react";
import mapData, { MapData, RoomData, RoomId } from "@/lib/map/mapData";
import RBush, { BBox } from "rbush";
import { RoomTreeNode } from "./useCreateRTree";
import mapConfig from "@/lib/map/mapConfig";

export type RoomDataWithPath = RoomData & {
  element: Path2D;
  center: { x: number; y: number };
  size: { height: number; width: number };
};

export type LabelDataWithPath = {
  lines: string[];
  element: Path2D;
  roomId: RoomId;
  roomCenter: { x: number; y: number };
  roomSize: { height: number; width: number };
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
  const height = maxX - minX;
  const width = maxY - minY;
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

type WrappedLabelText = {
  lines: string[];
  textWidth: number;
  textHeight: number;
};

function wrapLabelText(
  roomPath: RoomDataWithPath,
  currentCellSize: number,
  labelMaxLineWidth: number,
  labelLineHeight: number
) {
  // Max width before wrapping in normalized grid units
  const adjustedMaxWidth = labelMaxLineWidth * currentCellSize;
  const adjustedLineHeight = labelLineHeight * currentCellSize;

  // Split text into words for wrapping
  const words = roomPath.label.split(" ");
  let currentLine = "";
  const lines = [];
  let maxLineWidth = 0;

  words.forEach((word, index) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = testLine.length * 1 * currentCellSize;

    if (testWidth <= adjustedMaxWidth && words.length) {
      currentLine = testLine;
    } else if (words.length === 1 || index === 0) {
      currentLine = testLine;
    } else {
      lines.push(currentLine);
      maxLineWidth = Math.max(
        maxLineWidth,
        currentLine.length * 1 * currentCellSize
      );
      currentLine = word;
    }
  });
  if (currentLine) {
    lines.push(currentLine);
    maxLineWidth = Math.max(
      maxLineWidth,
      currentLine.length * 1 * currentCellSize
    );
  }

  // Calculate text dimensions
  const textWidth = Math.min(adjustedMaxWidth, maxLineWidth);
  const textHeight = adjustedLineHeight * lines.length;

  const wrappedLabelText: WrappedLabelText = { lines, textHeight, textWidth };

  return wrappedLabelText;
}

function createLabelRect(
  roomPath: RoomDataWithPath,
  currentCellSize: number,
  labelPadding: number,
  wrappedLabelText: WrappedLabelText
) {
  // Label position modifiers
  const { center, labelOffset } = roomPath;
  const defaultXMod = 0;
  const defaultYMod = 0;
  const [xMod, yMod] = labelOffset ?? [defaultXMod, defaultYMod];

  const { textWidth, textHeight } = wrappedLabelText;

  const path2D = new Path2D();
  const rectX =
    center.x * currentCellSize + xMod - textWidth / 2 - labelPadding;
  const rectY =
    center.y * currentCellSize + yMod - textHeight / 2 - labelPadding;
  const rectWidth = textWidth + 2 * labelPadding;
  const rectHeight = textHeight + 2 * labelPadding;

  path2D.roundRect(rectX, rectY, rectWidth, rectHeight, 6);

  return path2D;
}

function createLabelsForRoomPaths(
  roomPaths: RoomDataWithPath[],
  currentCellSize: number,
  labelPadding: number,
  labelMaxLineWidth: number,
  labelLineHeight: number
) {
  const labelElements: LabelDataWithPath[] = [];
  for (const roomPath of Object.values(roomPaths)) {
    // Get the wrapped label text
    const wrappedLabelText = wrapLabelText(
      roomPath,
      currentCellSize,
      labelMaxLineWidth,
      labelLineHeight
    );
    const labelRect = createLabelRect(
      roomPath,
      currentCellSize,
      labelPadding,
      wrappedLabelText
    );
    labelElements.push({
      lines: wrappedLabelText.lines,
      element: labelRect,
      roomId: roomPath.id as RoomId,
      roomCenter: roomPath.center,
      roomSize: roomPath.size,
    });
  }
  return labelElements;
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
    const roomLabels = createLabelsForRoomPaths(
      roomPaths,
      currentCellSize,
      labelPadding,
      labelMaxLineWidth,
      labelLineHeight
    );
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
