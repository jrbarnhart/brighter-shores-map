import mapConfig from "@/lib/map/mapConfig";
import mapData, { RoomId } from "@/lib/map/mapData";
import React, { SetStateAction, useEffect } from "react";

export type RoomPathData = {
  element: Path2D;
  roomId: RoomId;
  fillColor: string;
};

function createCanvasPath2D(path: [number, number][]) {
  const canvasPath = new Path2D();

  if (path.length === 0) return canvasPath;

  const { cellSize } = mapConfig;
  // Multiply startX/Y by cell size
  const [startX, startY] = [path[0][0] * cellSize, path[0][1] * cellSize];
  canvasPath.moveTo(startX, startY);

  for (let i = 1; i < path.length; i++) {
    const [x, y] = [path[i][0] * cellSize, path[i][1 * cellSize]];
    canvasPath.lineTo(x, y);
  }

  canvasPath.closePath();
  return canvasPath;
}

export default function useCreateRoomPaths({
  setRoomPaths,
}: {
  setRoomPaths: React.Dispatch<SetStateAction<RoomPathData[]>>;
}) {
  useEffect(() => {
    const roomPaths: RoomPathData[] = [];
    for (const region of Object.values(mapData.regions)) {
      for (const room of region.rooms) {
        const roomPath = {
          element: createCanvasPath2D(room.path),
          roomId: room.id as RoomId,
          fillColor: room.color ?? mapConfig.defaultRoomFill,
        };
        roomPaths.push(roomPath);
      }
      setRoomPaths(roomPaths);
    }
  }, [setRoomPaths]);
}
