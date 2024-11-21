import { useEffect } from "react";
import { MapState } from "../useMapState";
import { debounce } from "@/lib/utils";

const useDebouncedResize = ({ mapState }: { mapState: MapState }) => {
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
};

export default useDebouncedResize;
