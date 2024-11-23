import { useMemo } from "react";
import mapData, { RoomId } from "@/lib/map/mapData";
import mapConfig from "@/lib/map/mapConfig";
import RBush, { BBox } from "rbush";
import { RoomTreeNode } from "./useCreateRTree";

export type RoomPathData = {
  element: Path2D;
  roomId: RoomId;
  fillColor: string;
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

function createCanvasPaths(currentCellSize: number) {
  const roomPaths: RoomPathData[] = [];
  for (const region of Object.values(mapData.regions)) {
    for (const room of region.rooms) {
      const roomPath = {
        element: createCanvasPath2D(room.path, room.origin, currentCellSize),
        roomId: room.id as RoomId,
        fillColor: room.color ?? mapConfig.defaultRoomFill,
      };
      roomPaths.push(roomPath);
    }
  }
  return roomPaths;
}

function filterVisiblePaths(
  roomPaths: RoomPathData[],
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

  const result = roomPaths.filter((path) => foundRoomIds.includes(path.roomId));
  return result;
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
    return createCanvasPaths(currentCellSize);
  }, [currentCellSize]);

  const visibleRoomPaths = useMemo(() => {
    return filterVisiblePaths(
      roomPaths,
      roomsCanvas,
      currentCellSize,
      mapPos,
      rTree
    );
  }, [currentCellSize, roomPaths, mapPos, rTree, roomsCanvas]);

  return { roomPaths, visibleRoomPaths };
}
