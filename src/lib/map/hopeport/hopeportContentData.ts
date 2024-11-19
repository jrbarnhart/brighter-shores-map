import { RoomContentData } from "../mapData";
import { HopeportRoomId } from "./hopeportRoomData";
import HOPEPORT_MONSTERS from "./roomContents/hopeportMonsterData";

type HopeportContentData = RoomContentData & { roomId: HopeportRoomId };

const HOPEPORT_MONSTER_MAP = Object.fromEntries(
  HOPEPORT_MONSTERS.map((monster) => [monster.name, monster])
);
const hopeportContentData = [
  { roomId: "sparring-area", monsters: [HOPEPORT_MONSTER_MAP["guard"]] },
] as const satisfies readonly HopeportContentData[];

export default hopeportContentData;
