import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { MapState } from "./map/useMapState";

type SliderProps = React.ComponentProps<typeof Slider>;

export default function ZoomSlider({
  ...props
}: SliderProps & { mapState: MapState }) {
  const { className, mapState } = props;
  return (
    <div className="absolute top-0 left-0 z-10 w-full mt-7 flex justify-around">
      <Slider
        value={[mapState.scale.value]}
        onValueChange={(value) => {
          mapState.scale.set(value[0]);
        }}
        max={200}
        min={10}
        step={15}
        className={cn("w-40 sm:w-72 md:w-96 z-10", className)}
        {...props}
      />
    </div>
  );
}
