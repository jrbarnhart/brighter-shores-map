import useAnimationFrame from "@/hooks/useAnimationFrame";
import { MapState } from "./useMapState";

export default function useAnimatedPos(mapState: MapState) {
  const { mapPos, animatedMapPos } = mapState;

  useAnimationFrame(() => {
    animatedMapPos.set(mapPos.value);
  });
}
