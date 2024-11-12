export type RoomData = {
  id: string;
  origin: [number, number];
  path: Array<number[]>;
  type: "residence" | "shop" | "world";
};

export type MapData = {
  /**
   * Array of rooms, each with a label, origin, shape, and type.
   * - id: HTML id used to create path that represents this room.
   * - origin: The coordinates [x, y] of the room.
   * - path: An array of coordinates representing the room's shape.
   * - type: The type of room, which can be "residence", "shop", or "world".
   */
  rooms: RoomData[];
  /**
   * A list of coordinate pairs that represent transitions between rooms.
   */
  transitions: Array<[number, number]>;
};

/**
 * Data that represents the game world of Brighter Shores.
 * - rooms: Array of rooms, each with a label, origin, shape, and type.
 * - transitions: A list of coordinate pairs that represent transitions between rooms.
 */
const mapData: MapData = {
  rooms: [
    {
      id: "captainDegreenesOffice",
      origin: [0, 0],
      path: [
        [0, 0],
        [5, 0],
        [5, 5],
        [4, 5],
        [4, 6],
        [2, 6],
        [2, 5],
        [0, 5],
      ],
      type: "residence",
    },
  ],
  transitions: [
    [3, 7],
    [4, 7],
  ],
};

export default mapData;
