import { RoomId } from "@/lib/types";
import React, { SetStateAction } from "react";

export default function RoomLink({
  ...props
}: {
  text: string;
  roomId: RoomId;
  setSelectedRoomId: React.Dispatch<SetStateAction<RoomId | null>>;
}) {
  const { text, roomId, setSelectedRoomId } = props;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedRoomId(roomId);
  };

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
