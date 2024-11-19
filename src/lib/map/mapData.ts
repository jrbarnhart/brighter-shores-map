import hopeportRoomData, { HopeportRoomId } from "./hopeport/hopeportRoomData";
import hopeportContentData from "./hopeport/hopeportContentData";

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

export type MonsterVariant = {
  name: string;
  health: number;
  experience: number;
  skillLevel: number;
};

export type Monster = {
  name: string;
  variants: MonsterVariant[];
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

export type RoomContentData = {
  obelisk?: boolean;
  storageRift?: boolean;
  portalStone?: boolean;
  // Resources
  monsters?: Monster[];
  npcs?: NPC[];
  banks?: BankType[];
  // Quest step
};

// Union type for all room ids
type RoomId = HopeportRoomId;

export type RoomIdContentData = RoomContentData & { roomId: RoomId };

export type RegionData = {
  rooms: readonly RoomData[];
  contents?: readonly RoomIdContentData[];
};

export type MapData = {
  regions: { hopeport: RegionData };
};

const mapData: MapData = {
  regions: {
    hopeport: { rooms: hopeportRoomData, contents: hopeportContentData },
  },
};

export default mapData;
