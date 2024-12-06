import { useEffect } from "react";
import { MapState } from "./useMapState";
import { findRoomById, toNormalizedGridSpace } from "@/lib/utils";

export default function useScrollToSelectedRoom({
  mapState,
}: {
  mapState: MapState;
}) {
  const { selectedRoomId, mapPos } = mapState;
  const setMapPos = mapPos.set;
  const rooms = mapState.roomPaths.value;
  const currentCellSize = mapState.currentCellSize.value;

  useEffect(() => {
    if (selectedRoomId.value) {
      const roomPath = findRoomById(rooms, selectedRoomId.value);
      if (roomPath) {
        const offX = toNormalizedGridSpace(
          window.innerWidth / 2,
          currentCellSize
        );
        const offY = toNormalizedGridSpace(
          window.innerHeight / 2,
          currentCellSize
        );
        let { x, y } = roomPath.center;
        x -= offX;
        y -= offY;
        setMapPos({ x, y });
      }
    }
  }, [currentCellSize, rooms, selectedRoomId.value, setMapPos]);
}
