import mapData from "@/lib/map/mapData";
import React, { SetStateAction, useEffect } from "react";

function createCanvasPath2D(path: [number, number][]) {
  const canvasPath = new Path2D();

  if (path.length === 0) return canvasPath;

  const [startX, startY] = path[0];
  canvasPath.moveTo(startX, startY);

  for (let i = 1; i < path.length; i++) {
    const [x, y] = path[i];
    canvasPath.lineTo(x, y);
  }

  canvasPath.closePath();
  return canvasPath;
}

export default function useCreateRoomPaths(
  setRoomPaths: React.Dispatch<SetStateAction<Path2D[]>>
) {
  useEffect(() => {
    const roomPaths = [];
    for (const region of Object.values(mapData.regions)) {
      for (const room of region.rooms) {
        roomPaths.push(createCanvasPath2D(room.path));
      }
      setRoomPaths(roomPaths);
    }
  }, [setRoomPaths]);
}
