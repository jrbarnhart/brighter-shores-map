import { BankType, NPC } from "@/lib/types";
import { HopeportRoomId } from "./hopeportRoomData";
import HOPEPORT_MONSTER_DATA, {
  HopeportMonsterBaseName,
} from "./roomContents/hopeportMonsterData";

export type HopeportRoomContentData = {
  roomId: HopeportRoomId;
  obelisk?: boolean;
  storageRift?: boolean;
  portalStone?: boolean;
  // Add Resources later
  monsters?: HopeportMonsterBaseName[];
  npcs?: NPC[];
  banks?: BankType[];
};

// Create the monster content data
const newHopeportContentData: HopeportRoomContentData[] = [];
// Add all locations from all monsters
for (const monster of HOPEPORT_MONSTER_DATA) {
  for (const location of monster.locations) {
    // Check for existing room entry
    const existingRoomEntry = newHopeportContentData.find(
      (data) => data.roomId === location
    );
    // If there is no entry yet add it
    if (!existingRoomEntry) {
      newHopeportContentData.push({
        roomId: location,
        monsters: [monster.name],
      });
      // Else if the room entry exists and somehow has no monsters array
    } else if (!existingRoomEntry.monsters) {
      existingRoomEntry.monsters = [monster.name];
      // Else the room entry exists and has monsters array so add to it
    } else {
      existingRoomEntry.monsters.push(monster.name);
    }
  }
}

// TODO: Add the resource and npc entries here later on

const hopeportContentData = [
  ...newHopeportContentData,
] as const satisfies readonly HopeportRoomContentData[];

export default hopeportContentData;
