import mapConfig from "@/lib/map/mapConfig";
import mapData, { RoomId } from "@/lib/map/mapData";
import { useEffect } from "react";
import { MapState } from "../useMapState";

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

export default function useCreateRoomPaths({
  mapState,
}: {
  mapState: MapState;
}) {
  useEffect(() => {
    const setRoomPaths = mapState.roomPaths.set;
    const currentCellSize = mapState.currentCellSize.value;
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
      setRoomPaths(roomPaths);
    }
  }, [mapState.currentCellSize.value, mapState.roomPaths.set]);
}
