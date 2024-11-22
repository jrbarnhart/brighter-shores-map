import { useEffect } from "react";
import { MapState } from "../useMapState";
import useDebounce from "@/hooks/useDebounce";

// Sets canvas size to window size, debounced
export default function useCanvasSize({ mapState }: { mapState: MapState }) {
  const { value: size, set: setSize } = mapState.canvas.size;

  const handleResize = useDebounce(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  }, 100);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      handleResize.cancel();
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize, setSize]);

  return size;
}
