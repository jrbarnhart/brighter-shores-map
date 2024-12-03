import hopeportRoomData from "./hopeport/hopeportRoomData";
import hopeportContentData from "./hopeport/hopeportContentData";
import { MapData, SearchableData } from "../types";
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

const searchableData: SearchableData[] = [];

HOPEPORT_MONSTER_DATA.forEach((monster) => {
  searchableData.push({ name: monster.name, type: "Monster" });
});

// For each region
// For every room in that region
// Add that string

export default mapData;

export { searchableData };
