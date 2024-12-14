import { MonsterBaseName, RoomDataWithPath, RoomId } from "../types";
import hopeportRoomData from "./hopeport/hopeportRoomData";
import HOPEPORT_MONSTER_DATA from "./hopeport/roomContents/hopeportMonsterData";
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

// Get a monster by a given monster name
export function findMonsterByBaseName(monsterBaseName: MonsterBaseName) {
  const resultInHopeport = HOPEPORT_MONSTER_DATA.find(
    (monster) => monster.name === monsterBaseName
  );
  if (resultInHopeport) return resultInHopeport;
  return null;
}
