import { useEffect } from "react";
import {
  LabelDataWithPath,
  RoomDataWithPath,
} from "./useCanvasElementsManager";
import { MapState } from "../useMapState";
import { MapConfig } from "@/lib/map/mapConfig";

export default function useDrawMap({
  mapState,
  mapConfig,
}: {
  mapState: MapState;
  mapConfig: MapConfig;
}) {
  function drawRoomPaths(
    ctx: CanvasRenderingContext2D,
    roomPaths: RoomDataWithPath[],
    mapPos: { x: number; y: number },
    cellSize: number,
    mapConfig: MapConfig
  ) {
    const { defaultRoomFill } = mapConfig;
    ctx.save();

    ctx.translate(-mapPos.x * cellSize, -mapPos.y * cellSize);

    roomPaths.forEach((roomPath) => {
      ctx.fillStyle = roomPath.color ?? defaultRoomFill;
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
    currentCellSize: number,
    mapConfig: MapConfig
  ) {
    ctx.save();

    ctx.translate(-mapPos.x * currentCellSize, -mapPos.y * currentCellSize);

    const visibleRoomIds = visibleRoomPaths.map((path) => path.id);
    const visibleRoomLabels = roomLabels.filter((label) =>
      visibleRoomIds.includes(label.roomId)
    );

    for (const roomLabel of visibleRoomLabels) {
      // Draw the label rect
      ctx.fillStyle = "green";
      ctx.fill(roomLabel.element);
      ctx.strokeStyle = "blue";
      ctx.stroke(roomLabel.element);

      // Values that are normalized need to be * cell size to get px values
      const { labelPadding, labelLineHeight } = mapConfig;
      const pxLabelLineHeight = labelLineHeight * currentCellSize;
      const pxLabelPadding = labelPadding * currentCellSize;
      const totalLineHeight = pxLabelLineHeight * roomLabel.lines.length;
      const labelY =
        roomLabel.center.y * currentCellSize - roomLabel.size.height / 2;
      const textStartY =
        labelY +
        pxLabelPadding +
        (roomLabel.size.height - pxLabelPadding * 2 - totalLineHeight) / 2;

      // Draw the label text
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";

      roomLabel.lines.forEach((line, index) => {
        const textStartX = roomLabel.center.x * currentCellSize;
        const y = textStartY + index * pxLabelLineHeight;
        ctx.fillText(line, textStartX, y);
      });
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
    drawRoomPaths(
      roomsCanvasContext,
      visibleRooms,
      mapPos,
      currentCellSize,
      mapConfig
    );
    drawRoomLabels(
      roomsCanvasContext,
      roomLabels,
      visibleRooms,
      mapPos,
      currentCellSize,
      mapConfig
    );
  }, [
    mapConfig,
    mapState.canvas.labels.ref,
    mapState.canvas.rooms.ref,
    mapState.canvas.size,
    mapState.currentCellSize.value,
    mapState.mapPos.value,
    mapState.roomLabels.value,
    mapState.visibleRoomPaths.value,
  ]);
}
