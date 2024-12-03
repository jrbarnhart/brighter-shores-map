import { MapState } from "./useMapState";
import mapConfig from "@/lib/map/mapConfig";
import { Button } from "../ui/button";
import { useCallback } from "react";
import { adjustMapPosOnZoom } from "@/lib/utils";

export default function ZoomButtons({ ...props }: { mapState: MapState }) {
  const { mapState } = props;
  const { currentCellSize, mapPos, canvas } = mapState;
  const canvasSize = canvas.size.value;

  const { cellSizeIncrement, minCellSize, maxCellSize } = mapConfig;

  const onClick = useCallback(
    (zoomIn: boolean) => {
      const change = cellSizeIncrement * (zoomIn ? 1 : -1);

      // Calculate the new cell size first
      const testCellSize = Math.min(
        maxCellSize,
        Math.max(minCellSize, currentCellSize.value + change)
      );

      // Only proceed if cell size should change
      if (testCellSize !== currentCellSize.value) {
        adjustMapPosOnZoom(
          mapPos.set,
          canvasSize,
          currentCellSize.value,
          testCellSize
        );

        // Update cell size
        currentCellSize.set(testCellSize);
      }
    },
    [
      canvasSize,
      cellSizeIncrement,
      currentCellSize,
      mapPos.set,
      maxCellSize,
      minCellSize,
    ]
  );

  return (
    <div className="absolute right-0 z-10 w-12 h-full mr-3 flex flex-col justify-center gap-10">
      <Button
        onClick={() => {
          onClick(true);
        }}
        className={`${
          currentCellSize.value >= maxCellSize ? "brightness-50" : " "
        } h-20 w-full font-bold text-sidebar-foreground bg-sidebar border border-sidebar-accent hover:bg-sidebar-accent hover:text-foreground`}
      >
        +
      </Button>
      <Button
        onClick={() => {
          onClick(false);
        }}
        className={`${
          currentCellSize.value <= minCellSize ? "brightness-50" : " "
        } h-20 w-full font-bold text-sidebar-foreground bg-sidebar border border-sidebar-accent hover:bg-sidebar-accent hover:text-foreground`}
      >
        -
      </Button>
    </div>
  );
}
