import { useEffect } from "react";
import { MapState } from "../useMapState";
import useDebounce from "@/hooks/useDebounce";

// Sets canvas size to window size, debounced
export default function useCanvasSize({ mapState }: { mapState: MapState }) {
  const { value: size, set: setSize } = mapState.canvas.rooms.size;

  const handleResize = useDebounce(() => {
    console.log("Debounced");
    setSize({ width: window.innerWidth, height: window.innerHeight });
  }, 100);

  useEffect(() => {
    console.log("Size");
    window.addEventListener("resize", handleResize);
    return () => {
      handleResize.cancel();
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize, setSize]);

  return size;
}
