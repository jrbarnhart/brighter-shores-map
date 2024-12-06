import { useEffect } from "react";
import { MapState } from "./useMapState";
import { findRoomById } from "@/lib/utils";

export default function useScrollToSelectedRoom({
  mapState,
}: {
  mapState: MapState;
}) {
  const { selectedRoomId, mapPos } = mapState;
  const setMapPos = mapPos.set;
  const rooms = mapState.roomPaths.value;

  useEffect(() => {
    if (selectedRoomId.value) {
      const roomPath = findRoomById(rooms, selectedRoomId.value);
      if (roomPath) {
        const { x, y } = roomPath.center;
        setMapPos({ x, y });
      }
    }
  }, [rooms, selectedRoomId.value, setMapPos]);
}
