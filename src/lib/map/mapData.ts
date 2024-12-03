import hopeportRoomData from "./hopeport/hopeportRoomData";
import hopeportContentData from "./hopeport/hopeportContentData";
import { MapData, SearchResult } from "../types";
import HOPEPORT_MONSTER_DATA from "./hopeport/roomContents/hopeportMonsterData";

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
  regions: {
    hopeport: { rooms: hopeportRoomData, contents: hopeportContentData },
  },
};

const searchableData: SearchResult[] = [
  ...HOPEPORT_MONSTER_DATA.map((data) => ({
    ...data,
    dataType: "monster" as const,
  })),
];

// For each region
// For every room in that region
// Add that string

export default mapData;

export { searchableData };
