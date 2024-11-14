import hopeportData from "./hopeportData";

export type RoomData = {
  id: string;
  label: string;
  labelOffset?: [number, number];
  origin: [number, number];
  path: Array<[number, number]>;
  type: "residence" | "shop" | "world" | "profession" | "obelisk" | "portal";
};

export type RegionData = {
  rooms: RoomData[];
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
