import { useEffect } from "react";
import { RoomPathData } from "./useRoomPathsManager";
import { MapState } from "../useMapState";

export default function useDrawRooms({ mapState }: { mapState: MapState }) {
  function drawRoomPaths(
    ctx: CanvasRenderingContext2D,
    roomPaths: RoomPathData[],
    mapPos: { x: number; y: number },
    cellSize: number
  ): void {
    ctx.save();

    // Subtract the mapPos values to move content opposite to drag direction
    ctx.translate(-mapPos.x * cellSize, -mapPos.y * cellSize);

    roomPaths.forEach((roomPath) => {
      ctx.fillStyle = roomPath.fillColor;
      ctx.fill(roomPath.element);
      ctx.strokeStyle = "black";
      ctx.stroke(roomPath.element);
    });

    ctx.restore();
  }

  useEffect(() => {
    const mapPos = mapState.mapPos.value;
    const currentCellSize = mapState.currentCellSize.value;
    const roomsCanvas = mapState.canvas.rooms.ref.current;
    const roomsCanvasContext =
      mapState.canvas.rooms.ref.current?.getContext("2d");
    const visibleRooms = mapState.visibleRoomPaths.value;
    if (!roomsCanvasContext || !roomsCanvas || visibleRooms.length === 0) {
      return;
    }

    roomsCanvasContext.clearRect(0, 0, roomsCanvas.width, roomsCanvas.height);
    drawRoomPaths(roomsCanvasContext, visibleRooms, mapPos, currentCellSize);
  }, [
    mapState.canvas.rooms.ref,
    mapState.currentCellSize.value,
    mapState.mapPos.value,
    mapState.visibleRoomPaths.value,
  ]);
}
