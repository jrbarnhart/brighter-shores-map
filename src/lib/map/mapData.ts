import {
  HopeportMonsterName,
  HopeportMonsterType,
} from "./hopeport/hopeportContentsData";
import hopeportRoomData from "./hopeport/hopeportRoomData";

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
export type RoomData = {
  id: string;
  label: string;
  labelOffset?: [number, number];
  origin: [number, number];
  path: Array<[number, number]>;
  color?: string;
  type: "residence" | "shop" | "world" | "profession" | "obelisk" | "portal";
};

export type NPC = {
  name: string;
  types: ["vendor" | "quest" | "extra"];
};

export type Monster = {
  name: HopeportMonsterName<HopeportMonsterType>;
};

type BankType =
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
  // Resources
  monsters?: Monster[];
  npcs?: NPC[];
  banks?: BankType[];
  // Quest step
};

export type RegionData = {
  rooms: readonly RoomData[];
  contents?: RoomContentsData[];
};

export type MapData = {
  regions: { hopeport: RegionData };
};

const mapData: MapData = {
  regions: { hopeport: { rooms: hopeportRoomData } },
};

export default mapData;
