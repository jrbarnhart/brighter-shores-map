import { useEffect } from "react";
import { MapState } from "../useMapState";
import { MapConfig } from "@/lib/map/mapConfig";
import {
  LabelDataWithPath,
  PixelValue,
  Point,
  RoomDataWithPath,
} from "@/lib/types";
import { toPixels } from "@/lib/utils";

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
    const { defaultRoomFill, defaultRoomBorder } = mapConfig;
    ctx.save();

    ctx.translate(-mapPos.x * cellSize, -mapPos.y * cellSize);
    console.log("Draw");
    roomPaths.forEach((roomPath) => {
      ctx.fillStyle = roomPath.color ?? defaultRoomFill;
      ctx.fill(roomPath.element);
      ctx.strokeStyle = defaultRoomBorder;
      ctx.stroke(roomPath.element);
    });

    ctx.restore();
  }

  function drawRoomLabels(
    ctx: CanvasRenderingContext2D,
    labels: LabelDataWithPath[],
    visibleRooms: RoomDataWithPath[],
    viewport: { position: Point },
    cellSize: number,
    style: {
      padding: PixelValue;
      lineHeight: PixelValue;
      backgroundColor: string;
      borderColor: string;
      textColor: string;
      textSize: PixelValue;
    }
  ) {
    ctx.save();
    ctx.translate(
      -toPixels(viewport.position.x, cellSize),
      -toPixels(viewport.position.y, cellSize)
    );

    const visibleLabels = labels.filter((label) =>
      visibleRooms.some((room) => room.id === label.roomId)
    );

    for (const label of visibleLabels) {
      // Draw background and border
      ctx.fillStyle = style.backgroundColor;
      ctx.strokeStyle = style.borderColor;
      ctx.fill(label.element);
      ctx.stroke(label.element);

      // Draw text
      const paddingPx = toPixels(style.padding, cellSize);
      const totalLinesHeight = style.lineHeight * label.lines.length;
      let offSet = { x: 0, y: 0 };
      if (label.offset) {
        offSet = label.offset;
      }

      const textStartY =
        toPixels(label.center.y + offSet.y, cellSize) -
        label.size.height / 2 +
        paddingPx +
        (label.size.height - paddingPx * 2 - totalLinesHeight) / 2;

      ctx.fillStyle = style.textColor;
      ctx.font = `bold ${style.textSize.toString()}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";

      label.lines.forEach((line, index) => {
        const x = toPixels(label.center.x + offSet.x, cellSize);
        const y = textStartY + index * style.lineHeight;
        ctx.fillText(line, x, y);
      });
    }

    ctx.restore();
  }

  useEffect(() => {
    const {
      labelPadding,
      labelLineHeight,
      labelColor,
      labelTextColor,
      labelTextSize,
      labelBorderColor,
    } = mapConfig;
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
      !labelsCanvas
    ) {
      return;
    }

    roomsCanvasContext.clearRect(0, 0, roomsCanvas.width, roomsCanvas.height);
    labelsCanvasContext.clearRect(0, 0, roomsCanvas.width, roomsCanvas.height);

    drawRoomPaths(
      roomsCanvasContext,
      visibleRooms,
      mapPos,
      currentCellSize,
      mapConfig
    );
    drawRoomLabels(
      labelsCanvasContext,
      roomLabels,
      visibleRooms,
      { position: mapPos },
      currentCellSize,
      {
        padding: labelPadding,
        backgroundColor: labelColor,
        borderColor: labelBorderColor,
        lineHeight: labelLineHeight,
        textColor: labelTextColor,
        textSize: labelTextSize,
      }
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
