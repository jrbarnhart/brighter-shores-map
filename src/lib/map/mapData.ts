import hopeportData from "./hopeport/hopeportData";
import { HopePortRoomNames } from "./hopeport/hopeportRoomNames";

export type RoomData = {
  id: HopePortRoomNames;
  label: string;
  labelOffset?: [number, number];
  origin: [number, number];
  path: Array<[number, number]>;
  color?: string;
  type: "residence" | "shop" | "world" | "profession" | "obelisk" | "portal";
};

export type RegionData = {
  rooms: RoomData[];
};

export type NPC = {
  name: string;
  types: ["vendor" | "quest" | "extra"];
};

export type Bank =
  | "bait"
  | "bones"
  | "equipment"
  | "ingredients"
  | "lumber"
  | "monument"
  | "potions"
  | "timber"
  | "leathers";

export type RoomContentsData = {
  obelisk?: boolean;
  storageRift?: boolean;
  portalStone?: boolean;
  // Mobs
  // Resources
  npcs?: NPC[];
  banks?: Bank[];
  // Quest step
};

export type MapData = {
  regions: { hopeport: RegionData };
};

/*
  Room Template:
  {
    id: "id",
    origin: [0,0],
    path: [
      [0,0],
    ],
    type: "world"
  } 
*/

const mapData: MapData = {
  regions: { hopeport: hopeportData },
};

export default mapData;
