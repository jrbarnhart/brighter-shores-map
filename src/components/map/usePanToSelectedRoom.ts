import { useEffect, useRef } from "react";
import { MapState } from "./useMapState";
import { findRoomById, toNormalizedGridSpace } from "@/lib/utils";
import { RoomId } from "@/lib/types";

export default function usePanToSelectedRoom({
  mapState,
}: {
  mapState: MapState;
}) {
  const { selectedRoomId, mapPos } = mapState;
  const setMapPos = mapPos.set;
  const rooms = mapState.roomPaths.value;
  const currentCellSize = mapState.currentCellSize.value;
  const lastSelectedRoom = useRef<RoomId | null>(null);

  useEffect(() => {
    if (
      selectedRoomId.value &&
      selectedRoomId.value !== lastSelectedRoom.current
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
        lastSelectedRoom.current = selectedRoomId.value;
      }
    }
  }, [currentCellSize, rooms, selectedRoomId.value, setMapPos]);
}
