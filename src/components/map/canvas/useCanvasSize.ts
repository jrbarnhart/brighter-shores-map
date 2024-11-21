import { useEffect } from "react";
import { MapState } from "../useMapState";
import { debounce } from "@/lib/utils";

// Sets canvas size to window size, debounced
export default function useCanvasSize({ mapState }: { mapState: MapState }) {
  const { value: size, set: setSize } = mapState.canvas.rooms.size;

  useEffect(() => {
    const handleResize = debounce(() => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }, 100);
    window.addEventListener("resize", handleResize);
    return () => {
      handleResize.cancel();
      window.removeEventListener("resize", handleResize);
    };
  }, [setSize]);

  return size;
}
