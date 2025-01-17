import { useEffect } from "react";
import { MapState } from "./useMapState";
import { toNormalizedGridSpace } from "@/lib/utils";
import { findRoomById } from "@/lib/map/mapDataUtils";

export default function usePanToSelectedRoom({
  mapState,
}: {
  mapState: MapState;
}) {
  const { selectedRoomId, mapPos, lastSelectedRoomId } = mapState;
  const setMapPos = mapPos.set;
  const rooms = mapState.roomPaths.value;
  const currentCellSize = mapState.currentCellSize.value;

  useEffect(() => {
    if (
      selectedRoomId.value &&
      selectedRoomId.value !== lastSelectedRoomId.ref.current
    ) {
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
        lastSelectedRoomId.ref.current = selectedRoomId.value;
      }
    }
  }, [
    currentCellSize,
    lastSelectedRoomId.ref,
    rooms,
    selectedRoomId.value,
    setMapPos,
  ]);
}
