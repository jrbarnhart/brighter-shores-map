import hopeportData from "./hopeportData";

export type RoomData = {
  id: string;
  origin: [number, number];
  path: Array<[number, number]>;
  type: "residence" | "shop" | "world" | "profession" | "obelisk" | "portal";
};

export type RegionData = {
  /**
   * Array of rooms, each with a id, origin, path, and type.
   * - id: HTML id used to create path that represents this room.
   * - origin: The coordinates [x, y] of the room. Origin (0,0) is top-left corner of Captain Degreene's Office.
   * - path: An array of coordinates representing the room's shape.
   * - type: The type of room, which can be "residence", "shop", or "world".
   */
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

/**
 * Data that represents the game world of Brighter Shores.
 * - regions: Array of regions representing the main areas of the game map.
 */
const mapData: MapData = {
  regions: { hopeport: hopeportData },
};

export default mapData;
