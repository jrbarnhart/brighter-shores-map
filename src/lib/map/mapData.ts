import hopeportRoomData from "./hopeport/hopeportRoomData";
import hopeportContentData from "./hopeport/hopeportContentData";
import { MapData, RoomContentAndRoomData, SearchResult } from "../types";
import HOPEPORT_MONSTER_DATA from "./hopeport/roomContents/hopeportMonsterData";
import HOPEPORT_RESOURCE_DATA from "./hopeport/roomContents/hopeportResourceData";

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

const combinedRoomContentsAndData: RoomContentAndRoomData[] =
  hopeportRoomData.map((roomData) => {
    const content = hopeportContentData.find(
      (contentData) => contentData.roomId === roomData.id
    );

    if (!content) {
      return { data: roomData, content: { roomId: roomData.id } };
    } else {
      return { data: roomData, content };
    }
  });

const searchableData: SearchResult[] = [
  ...HOPEPORT_RESOURCE_DATA.map((data) => ({
    ...data,
    dataType: "resource" as const,
  })),
  ...HOPEPORT_MONSTER_DATA.map((data) => ({
    ...data,
    dataType: "monster" as const,
  })),
  ...combinedRoomContentsAndData.map((data) => ({
    ...data,
    dataType: "room" as const,
  })),
];

// For each region
// For every room in that region
// Add that string

export default mapData;

export { searchableData };
