import { MapState } from "./useMapState";
import mapConfig from "@/lib/map/mapConfig";
import { Button } from "../ui/button";
import { useCallback } from "react";

export default function ZoomSlider({ ...props }: { mapState: MapState }) {
  const { mapState } = props;
  const { currentCellSize } = mapState;

  const { cellSizeIncrement, minCellSize, maxCellSize } = mapConfig;

  const onClick = useCallback(
    (positive: boolean) => {
      const change = cellSizeIncrement * (positive ? 1 : -1);
      currentCellSize.set((prev) => {
        return Math.min(maxCellSize, Math.max(minCellSize, prev + change));
      });
    },
    [cellSizeIncrement, currentCellSize, maxCellSize, minCellSize]
  );

  return (
    <div className="absolute right-0 z-10 w-12 h-full mr-3 flex flex-col justify-center gap-10">
      <Button
        onClick={() => {
          onClick(true);
        }}
        className={`${
          currentCellSize.value >= maxCellSize ? "brightness-50" : " "
        } h-20 w-full font-bold bg-sidebar border border-sidebar-accent hover:bg-sidebar-accent hover:text-foreground`}
      >
        +
      </Button>
      <Button
        onClick={() => {
          onClick(false);
        }}
        className={`${
          currentCellSize.value <= minCellSize ? "brightness-50" : " "
        } h-20 w-full font-bold bg-sidebar border border-sidebar-accent hover:bg-sidebar-accent hover:text-foreground`}
      >
        -
      </Button>
    </div>
  );
}
