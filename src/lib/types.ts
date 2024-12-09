import { BBox } from "rbush";
import { HopeportRoomContentData } from "./map/hopeport/hopeportContentData";
import { HopeportRoomId } from "./map/hopeport/hopeportRoomData";
import {
  HopeportMonsterBaseName,
  HopeportMonsterNameWithVariant,
} from "./map/hopeport/roomContents/hopeportMonsterData";
import { SetStateAction } from "react";

/************************ *
  General Types
 ************************ */

// Used to tell diff between normalized "grid space" values and pixel values
export type NormalizedValue = number;
export type PixelValue = number;

export type Size = {
  width: PixelValue;
  height: PixelValue;
};

export type Point = {
  x: NormalizedValue;
  y: NormalizedValue;
};

/************************ *
  Rooms
 ************************ */

// Used for adding type safety to entries in room data arrays
export type RoomData = {
  id: string;
  label: string;
  labelOffset?: [number, number];
  origin: [number, number];
  path: Array<[number, number]>;
  color?: string;
  type: "residence" | "shop" | "world" | "profession" | "obelisk" | "portal";
};

// Union type for all room ids
export type RoomId = HopeportRoomId;

// Type for using the room data in code other than the data files
export type Room = RoomData & {
  id: RoomId;
};

export type RoomDataWithPath = Room & {
  element: Path2D;
  center: { x: number; y: number };
  size: { height: number; width: number };
};

// Object used to draw room labels to canvas
export type LabelDataWithPath = {
  lines: string[];
  element: Path2D;
  roomId: RoomId;
  center: { x: number; y: number };
  size: { height: number; width: number };
  offset: { x: number; y: number } | undefined;
};

// Node in the Rbush R-Tree used for finding visible rooms
export type RoomTreeNode = BBox & {
  roomId: RoomId;
};

/************************ *
  Content
 ************************ */

// Union type for all RoomContentData (union since other regions may end up having other types of content)
export type RoomContentData = HopeportRoomContentData;

export type RoomIdContentData = RoomContentData & { roomId: RoomId };

// Context for thing card provider
export type ThingCardContextType = {
  expandedCardId: ThingCardId | null;
  setExpandedCardId: React.Dispatch<SetStateAction<ThingCardId | null>>;
};

export type NPC = {
  name: string;
  types: ["vendor" | "quest" | "extra"];
};

// Union types for monster base names and w/ variants
export type MonsterBaseName = HopeportMonsterBaseName;
export type MonsterNameWithVariant = HopeportMonsterNameWithVariant;

// Types for data entries in monster data arrays
export type MonsterVariantData = {
  name: string;
  health: number;
  experience: number;
  skillLevel: number;
};

export type MonsterData = {
  name: string;
  locations: RoomId[];
  variants: MonsterVariantData[];
};

// Types used when using the monster data in code other than the data files
export type Monster = MonsterData & {
  name: MonsterBaseName;
};

export type ResourceNode = {
  name: string;
};

export type BankType =
  | "bait"
  | "bones"
  | "equipment"
  | "ingredients"
  | "lumber"
  | "monument"
  | "potions"
  | "timber"
  | "leathers";

// Type that combines searchable data which includes monsters, npcs, and resources
export type SearchResult =
  | (NPC & { dataType: "npc" })
  | (MonsterData & { dataType: "monster" })
  | (ResourceNode & { dataType: "resource" });

// Type that is all the possible thing card ids
export type ThingCardId = MonsterBaseName;

/************************ *
  Regions
 ************************ */

export type RegionData = {
  rooms: readonly Room[];
  contents?: readonly RoomIdContentData[];
};

/************************ *
  Map
 ************************ */

export type MapData = {
  regions: { hopeport: RegionData };
};
