import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

type SliderProps = React.ComponentProps<typeof Slider>;

export default function ZoomSlider({ className, ...props }: SliderProps) {
  return (
    <div className="absolute top-0 left-0 z-10 w-full mt-7 flex justify-around">
      <Slider
        defaultValue={[100]}
        max={200}
        step={15}
        className={cn("w-40 sm:w-72 md:w-96 z-10", className)}
        {...props}
      />
    </div>
  );
}
