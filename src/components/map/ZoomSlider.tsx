import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { MapState } from "./useMapState";
import mapConfig from "@/lib/map/mapConfig";

type SliderProps = React.ComponentProps<typeof Slider>;

export default function ZoomSlider({
  mapState,
  ...props
}: SliderProps & { mapState: MapState }) {
  const { className } = props;
  const { cellSizeIncrement, minCellSize, maxCellSize } = mapConfig;
  return (
    <div className="absolute top-0 left-0 z-10 w-full mt-7 flex justify-around">
      <Slider
        value={[mapState.currentCellSize.value]}
        onValueChange={(value) => {
          mapState.currentCellSize.set(value[0]);
        }}
        max={maxCellSize}
        min={minCellSize}
        step={cellSizeIncrement}
        className={cn("w-40 sm:w-72 md:w-96 z-10", className)}
        {...props}
      />
    </div>
  );
}
