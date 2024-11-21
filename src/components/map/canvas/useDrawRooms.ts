import { useEffect } from "react";
import { RoomPathData } from "./useCreateRoomPaths";
import { MapState } from "../useMapState";

export default function useDrawRooms({ mapState }: { mapState: MapState }) {
  function drawRoomPaths(
    ctx: CanvasRenderingContext2D,
    roomPaths: RoomPathData[]
  ): void {
    roomPaths.forEach((roomPath) => {
      // Set the fill color for the current room
      ctx.fillStyle = roomPath.fillColor;

      // Fill the path directly
      ctx.fill(roomPath.element);

      // Optional: Add a stroke if you want room outlines
      ctx.strokeStyle = "black";
      ctx.stroke(roomPath.element);
    });
  }

  useEffect(() => {
    const roomCanvasContext =
      mapState.canvas.rooms.ref.current?.getContext("2d");
    const visibleRooms = mapState.visibleRoomPaths.value;
    if (!roomCanvasContext || visibleRooms.length === 0) return;
    drawRoomPaths(roomCanvasContext, visibleRooms);
  }, [mapState.canvas.rooms.ref, mapState.visibleRoomPaths.value]);
}
