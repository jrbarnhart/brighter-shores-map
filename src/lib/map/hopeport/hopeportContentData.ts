import { BankType, NPC } from "../mapData";
import { HopeportRoomId } from "./hopeportRoomData";
import { HopeportMonsterName } from "./roomContents/hopeportMonsterData";

export type HopeportRoomContentData = {
  roomId: HopeportRoomId;
  obelisk?: boolean;
  storageRift?: boolean;
  portalStone?: boolean;
  // Resources
  monsters?: HopeportMonsterName[];
  npcs?: NPC[];
  banks?: BankType[];
  // Quest step
};

const hopeportContentData = [
  { roomId: "sparring-area", monsters: ["guard"] },
] as const satisfies readonly HopeportRoomContentData[];

export default hopeportContentData;
