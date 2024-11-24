import { useEffect } from "react";
import {
  LabelDataWithPath,
  RoomDataWithPath,
} from "./useCanvasElementsManager";
import { MapState } from "../useMapState";
import mapConfig from "@/lib/map/mapConfig";

export default function useDrawMap({ mapState }: { mapState: MapState }) {
  function drawRoomPaths(
    ctx: CanvasRenderingContext2D,
    roomPaths: RoomDataWithPath[],
    mapPos: { x: number; y: number },
    cellSize: number
  ): void {
    ctx.save();

    ctx.translate(-mapPos.x * cellSize, -mapPos.y * cellSize);

    roomPaths.forEach((roomPath) => {
      ctx.fillStyle = roomPath.color ?? mapConfig.defaultRoomFill;
      ctx.fill(roomPath.element);
      ctx.strokeStyle = "black";
      ctx.stroke(roomPath.element);
    });

    ctx.restore();
  }

  function drawRoomLabels(
    ctx: CanvasRenderingContext2D,
    roomLabels: LabelDataWithPath[],
    visibleRoomPaths: RoomDataWithPath[],
    mapPos: { x: number; y: number },
    cellSize: number
  ) {
    ctx.save();

    ctx.translate(-mapPos.x * cellSize, -mapPos.y * cellSize);

    const visibleRoomIds = visibleRoomPaths.map((path) => path.id);
    const visibleRoomLabels = roomLabels.filter((label) =>
      visibleRoomIds.includes(label.roomId)
    );

    for (const roomLabel of visibleRoomLabels) {
      ctx.fillStyle = "green";
      ctx.fill(roomLabel.element);
      ctx.strokeStyle = "blue";
      ctx.stroke(roomLabel.element);
    }

    ctx.restore();
  }

  useEffect(() => {
    const mapPos = mapState.mapPos.value;
    const currentCellSize = mapState.currentCellSize.value;
    const roomsCanvas = mapState.canvas.rooms.ref.current;
    const roomsCanvasContext =
      mapState.canvas.rooms.ref.current?.getContext("2d");
    const labelsCanvas = mapState.canvas.labels.ref.current;
    const labelsCanvasContext = labelsCanvas?.getContext("2d");
    const visibleRooms = mapState.visibleRoomPaths.value;
    const roomLabels = mapState.roomLabels.value;
    if (
      !roomsCanvasContext ||
      !roomsCanvas ||
      !labelsCanvasContext ||
      !labelsCanvas ||
      visibleRooms.length === 0
    ) {
      return;
    }

    roomsCanvasContext.clearRect(0, 0, roomsCanvas.width, roomsCanvas.height);
    drawRoomPaths(roomsCanvasContext, visibleRooms, mapPos, currentCellSize);
    drawRoomLabels(
      roomsCanvasContext,
      roomLabels,
      visibleRooms,
      mapPos,
      currentCellSize
    );
    console.log("drawRoomPaths");
  }, [
    mapState.canvas.labels.ref,
    mapState.canvas.rooms.ref,
    mapState.canvas.size,
    mapState.currentCellSize.value,
    mapState.mapPos.value,
    mapState.roomLabels.value,
    mapState.visibleRoomPaths.value,
  ]);
}
