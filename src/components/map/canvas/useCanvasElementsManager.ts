import { useMemo } from "react";
import mapData, { MapData, RoomData, RoomId } from "@/lib/map/mapData";
import RBush, { BBox } from "rbush";
import { RoomTreeNode } from "./useCreateRTree";

export type RoomDataWithPath = RoomData & {
  element: Path2D;
  center: { x: number; y: number };
};

function createCanvasPath2D(
  path: [number, number][],
  origin: [number, number],
  cellSize: number
) {
  const canvasPath = new Path2D();

  if (path.length === 0) return canvasPath;

  // Multiply startX/Y by cell size
  const startX = (path[0][0] + origin[0]) * cellSize;
  const startY = (path[0][1] + origin[1]) * cellSize;

  canvasPath.moveTo(startX, startY);

  for (let i = 1; i < path.length; i++) {
    const x = (path[i][0] + origin[0]) * cellSize;
    const y = (path[i][1] + origin[1]) * cellSize;
    canvasPath.lineTo(x, y);
  }

  canvasPath.closePath();
  return canvasPath;
}

// Finds centers of rooms on a normalized grid with origin 0,0
function findRoomCenter(room: RoomData) {
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

  return { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
}

function createRoomPaths(currentCellSize: number, mapData: MapData) {
  const roomPaths: RoomDataWithPath[] = [];
  for (const region of Object.values(mapData.regions)) {
    for (const room of region.rooms) {
      const roomPath = {
        element: createCanvasPath2D(room.path, room.origin, currentCellSize),
        center: findRoomCenter(room),
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

function wrapLabelText(roomPath: RoomDataWithPath, defaultCellSize: number) {
  // Max width before wrapping in normalized grid units
  const maxWidth = 4 * defaultCellSize;
  const lineHeight = 0.8 * defaultCellSize;

  // Split text into words for wrapping
  const words = roomPath.label.split(" ");
  let currentLine = "";
  const lines = [];
  let maxLineWidth = 0;

  words.forEach((word, index) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = testLine.length * 1 * defaultCellSize;

    if (testWidth <= maxWidth && words.length) {
      currentLine = testLine;
    } else if (words.length === 1 || index === 0) {
      currentLine = testLine;
    } else {
      lines.push(currentLine);
      maxLineWidth = Math.max(
        maxLineWidth,
        currentLine.length * 1 * defaultCellSize
      );
      currentLine = word;
    }
  });
  if (currentLine) {
    lines.push(currentLine);
    maxLineWidth = Math.max(
      maxLineWidth,
      currentLine.length * 1 * defaultCellSize
    );
  }

  // Calculate text dimensions
  const textWidth = Math.min(maxWidth, maxLineWidth);
  const textHeight = lineHeight * lines.length;

  const wrappedLabelText: WrappedLabelText = { lines, textHeight, textWidth };

  return wrappedLabelText;
}

function createLabelRect(
  roomPath: RoomDataWithPath,
  wrappedLabelText: WrappedLabelText
) {
  // Label position modifiers
  const { center, labelOffset } = roomPath;
  const defaultXMod = 0;
  const defaultYMod = 0;
  const [xMod, yMod] = labelOffset ?? [defaultXMod, defaultYMod];
  const padding = 0.32;

  const { lines, textWidth, textHeight } = wrappedLabelText;
}

function createLabelsForRoomPaths(roomPaths: RoomDataWithPath[]) {
  for (const roomPath of Object.values(roomPaths)) {
    // Get the wrapped label text
    const wrappedLabelText = wrapLabelText(roomPath);
    const labelRect = createLabelRect(roomPath, wrappedLabelText);
  }
  // later when drawing the rects must be drawn first
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
  const roomPaths = useMemo(() => {
    return createRoomPaths(currentCellSize, mapData);
  }, [currentCellSize]);

  const visibleRoomPaths = useMemo(() => {
    return filterVisibleRooms(
      roomPaths,
      roomsCanvas,
      currentCellSize,
      mapPos,
      rTree
    );
  }, [currentCellSize, roomPaths, mapPos, rTree, roomsCanvas]);

  return { roomPaths, visibleRoomPaths };
}