import { RoomDataWithPath, RoomId } from "../types";
import hopeportRoomData from "./hopeport/hopeportRoomData";
import mapData from "./mapData";

// Get the room contents by id
export function getRoomContent(searchId: RoomId | null) {
  const resultInHopeport = mapData.regions.hopeport.contents.find(
    (data) => data.roomId === searchId
  );
  if (resultInHopeport) return resultInHopeport;
  return null;
}

// Get the room data by a given room id
export function findRoomById(rooms: RoomDataWithPath[], roomId: RoomId) {
  return rooms.find((room) => room.id === roomId);
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
