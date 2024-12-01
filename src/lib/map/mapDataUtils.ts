import { RoomId } from "../types";
import hopeportContentData from "./hopeport/hopeportContentData";
import hopeportRoomData from "./hopeport/hopeportRoomData";

// Get the top level contents
export function getRoomContent(searchId: RoomId | null) {
  return hopeportContentData.find((data) => data.roomId === searchId);
}

// Get a room's styled title
export function getRoomLabel(searchId: RoomId | null) {
  const roomData = hopeportRoomData.find((data) => data.id === searchId);
  return roomData?.label ?? "Not Selected";
}

// Get detailed contents with specific functions
// get monsters
// get resources
// get npcs
// etc
