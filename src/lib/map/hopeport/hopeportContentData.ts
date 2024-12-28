import { BankType, NPC, ResourceNode } from "@/lib/types";
import hopeportRoomData, { HopeportRoomId } from "./hopeportRoomData";
import HOPEPORT_MONSTER_DATA, {
  HopeportMonsterBaseName,
} from "./roomContents/hopeportMonsterData";
import HOPEPORT_RESOURCE_DATA from "./roomContents/hopeportResourceData";

export type HopeportRoomContentData = {
  roomId: HopeportRoomId;
  obelisk?: boolean;
  storageRift?: boolean;
  portalStone?: boolean;
  resources?: ResourceNode[];
  monsters?: HopeportMonsterBaseName[];
  npcs?: NPC[];
  banks?: BankType[];
};

// Initialize room content data for every room
const newHopeportContentData: HopeportRoomContentData[] = hopeportRoomData.map(
  (room) => {
    return { roomId: room.id };
  }
);

// Add all locations from all monsters
for (const monster of HOPEPORT_MONSTER_DATA) {
  for (const location of monster.locations) {
    // Check for existing room entry
    const existingRoomEntry = newHopeportContentData.find(
      (data) => data.roomId === location
    );
    // If there is no entry for some reason just add it
    if (!existingRoomEntry) {
      newHopeportContentData.push({
        roomId: location,
        monsters: [monster.name],
      });
      // Else if the room entry exists and has no monsters array then add one
    } else if (!existingRoomEntry.monsters) {
      existingRoomEntry.monsters = [monster.name];
      // Else the room entry exists and has monsters array so add to it
    } else {
      existingRoomEntry.monsters.push(monster.name);
    }
  }
}

// Add the resource entries
for (const resource of HOPEPORT_RESOURCE_DATA) {
  for (const location of resource.locations) {
    const existingRoomEntry = newHopeportContentData.find(
      (data) => data.roomId === location
    );
    if (!existingRoomEntry) {
      newHopeportContentData.push({ roomId: location, resources: [resource] });
    } else if (!existingRoomEntry.resources) {
      existingRoomEntry.resources = [resource];
    } else {
      existingRoomEntry.resources.push(resource);
    }
  }
}

const hopeportContentData = [
  ...newHopeportContentData,
] as const satisfies readonly HopeportRoomContentData[];

export default hopeportContentData;
