export type RoomData = {
  label: string;
  origin: [number, number];
  shape: Array<number[]>;
  type: "residence" | "shop" | "world";
};

export type MapData = {
  /**
   * Array of rooms, each with a label, origin, shape, and type.
   * - label: The name or description of the room.
   * - origin: The coordinates [x, y] of the room.
   * - shape: An array of coordinates representing the room's shape.
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
      label: "Captain Degreene's Office",
      origin: [0, 0],
      shape: [
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1],
        [0, 0, 0, 1, 1, 0],
      ],
      type: "residence",
    },
  ],
  transitions: [
    [3, -7],
    [4, -7],
  ],
};

export default mapData;
