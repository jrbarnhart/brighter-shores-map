import mapConfig from "@/lib/map/mapConfig";
import mapData, { MapData } from "@/lib/map/mapData";

export type RoomCenter = {
  roomId: string;
  center: [number, number];
};

export type InitializedMapValues = {
  originOffset: [number, number];
  mapSize: { width: number; height: number };
  roomCenters: RoomCenter[];
};

export default function initMap(svg: SVGSVGElement) {
  const { originOffset, mapHeight, mapWidth } = initMapSize(mapData);
  const roomCenters = initRoomCenters(mapData, originOffset);

  svg.setAttribute("width", mapWidth.toString());
  svg.setAttribute("height", mapHeight.toString());

  const initMapValues: InitializedMapValues = {
    originOffset,
    mapSize: { width: mapWidth, height: mapHeight },
    roomCenters,
  };

  return initMapValues;
}

function initMapSize(mapData: MapData) {
  let mapMinX = Infinity;
  let mapMaxX = -Infinity;
  let mapMinY = Infinity;
  let mapMaxY = -Infinity;

  for (const region of Object.values(mapData.regions)) {
    for (const room of region.rooms) {
      const { origin, path } = room;

      for (const vertex of path) {
        const absoluteX = origin[0] + vertex[0];
        const absoluteY = origin[1] + vertex[1];

        if (absoluteX < mapMinX) mapMinX = absoluteX;
        if (absoluteX > mapMaxX) mapMaxX = absoluteX;
        if (absoluteY < mapMinY) mapMinY = absoluteY;
        if (absoluteY > mapMaxY) mapMaxY = absoluteY;
      }
    }
  }

  const originOffset: [number, number] = [-mapMinX, -mapMinY];
  const mapWidth = (mapMaxX - mapMinX) * mapConfig.cellSize;
  const mapHeight = (mapMaxY - mapMinY) * mapConfig.cellSize;
  return { originOffset, mapWidth, mapHeight };
}

function initRoomCenters(mapData: MapData, originOffset: [number, number]) {
  const roomCenters: RoomCenter[] = [];
  for (const region of Object.values(mapData.regions)) {
    for (const room of region.rooms) {
      let roomMinX = Infinity;
      let roomMaxX = -Infinity;
      let roomMinY = Infinity;
      let roomMaxY = -Infinity;
      // Track the minX/Y and maxX/Y
      for (const vertex of room.path) {
        const absoluteX = room.origin[0] + vertex[0];
        const absoluteY = room.origin[1] + vertex[1];

        if (absoluteX < roomMinX) roomMinX = absoluteX;
        if (absoluteX > roomMaxX) roomMaxX = absoluteX;
        if (absoluteY < roomMinY) roomMinY = absoluteY;
        if (absoluteY > roomMaxY) roomMaxY = absoluteY;
      }
      // Find the center of those values
      const roomCenter: RoomCenter = {
        roomId: room.id,
        center: [
          (roomMinX + roomMaxX) / 2 + originOffset[0],
          (roomMinY + roomMaxY) / 2 + originOffset[1],
        ],
      };
      roomCenters.push(roomCenter);
    }
  }
  return roomCenters;
}
