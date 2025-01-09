import { RoomId } from "@/lib/types";
import React, { useCallback } from "react";
import { MapState } from "../map/useMapState";

export default function RoomLink({
  ...props
}: {
  text: string;
  roomId: RoomId;
  mapState: MapState;
}) {
  const { text, roomId, mapState } = props;
  const setSelectedRoomId = mapState.selectedRoomId.set;
  const setExpandedCardThing = mapState.expandedCardThing.set;

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setSelectedRoomId(roomId);
      setExpandedCardThing(null);
    },
    [roomId, setExpandedCardThing, setSelectedRoomId]
  );

  return (
    <a
      className="underline text-sidebar-accent"
      onClick={handleClick}
      href={`/${roomId}`}
    >
      {text}
    </a>
  );
}
