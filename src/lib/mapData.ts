export type RoomData = {
  id: string;
  origin: [number, number];
  path: Array<[number, number]>;
  type: "residence" | "shop" | "world";
};

export type MapData = {
  /**
   * Array of rooms, each with a label, origin, shape, and type.
   * - id: HTML id used to create path that represents this room.
   * - origin: The coordinates [x, y] of the room. Origin (0,0) is top-left corner of Captain Degreene's Office.
   * - path: An array of coordinates representing the room's shape.
   * - type: The type of room, which can be "residence", "shop", or "world".
   */
  rooms: RoomData[];
};

/**
 * Data that represents the game world of Brighter Shores.
 * - rooms: Array of rooms, each with a label, origin, shape, and type.
 */
const mapData: MapData = {
  rooms: [
    {
      id: "captain-degreenes-office",
      origin: [0, 0],
      path: [
        [0, 0],
        [6, 0],
        [6, 6],
        [5, 6],
        [5, 7],
        [3, 7],
        [3, 6],
        [0, 6],
      ],
      type: "residence",
    },
    {
      id: "training-ground",
      origin: [-6, 7],
      path: [
        [0, 0],
        [2, 0],
        [2, 2],
        [9, 2],
        [9, 0],
        [11, 0],
        [11, 2],
        [18, 2],
        [18, 0],
        [20, 0],
        [20, 2],
        [21, 2],
        [21, 3],
        [23, 3],
        [23, 5],
        [21, 5],
        [21, 14],
        [23, 14],
        [23, 16],
        [21, 16],
        [21, 19],
        [19, 19],
        [19, 15],
        [1, 15],
        [1, 11],
        [-1, 11],
        [-1, 9],
        [0, 9],
      ],
      type: "world",
    },
    {
      id: "hopeport-portal-stone",
      origin: [-13, -4],
      path: [
        [0, 0],
        [9, 0],
        [9, 11],
        [7, 11],
        [7, 9],
        [0, 9],
      ],
      type: "world",
    },
    {
      id: "sparring-area",
      origin: [-22, 12],
      path: [
        [0, 0],
        [13, 0],
        [13, 4],
        [15, 4],
        [15, 6],
        [13, 6],
        [13, 9],
        [0, 9],
      ],
      type: "world",
    },
  ],
};

export default mapData;
