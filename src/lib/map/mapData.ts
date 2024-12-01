import hopeportRoomData from "./hopeport/hopeportRoomData";
import hopeportContentData from "./hopeport/hopeportContentData";
import { MapData } from "../types";

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

export default mapData;
