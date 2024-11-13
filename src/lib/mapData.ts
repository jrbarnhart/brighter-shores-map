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
    {
      id: "barracks",
      origin: [10, -1],
      path: [
        [0, 0],
        [12, 0],
        [12, 6],
        [6, 6],
        [6, 7],
        [4, 7],
        [4, 8],
        [2, 8],
        [2, 7],
        [0, 7],
      ],
      type: "residence",
    },
    {
      id: "infirmary",
      origin: [18, 9],
      path: [
        [0, 0],
        [6, 0],
        [6, 6],
        [4, 6],
        [4, 8],
        [2, 8],
        [2, 6],
        [0, 6],
        [0, 3],
        [-1, 3],
        [-1, 1],
        [0, 1],
      ],
      type: "residence",
    },
    {
      id: "quartermaster",
      origin: [20, 17],
      path: [
        [0, 0],
        [2, 0],
        [2, 1],
        [4, 1],
        [4, 7],
        [-2, 7],
        [-2, 6],
        [-3, 6],
        [-3, 4],
        [-2, 4],
        [-2, 1],
        [0, 1],
      ],
      type: "shop",
    },
  ],
};

export default mapData;
