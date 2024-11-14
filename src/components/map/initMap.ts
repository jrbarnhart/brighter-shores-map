import mapConfig from "@/lib/map/mapConfig";
import mapData, { MapData } from "@/lib/map/mapData";

export default function initMap(svg: SVGSVGElement) {
  const { originOffset, mapHeight, mapWidth } = initMapSize(mapData);
  const roomCenters = initRoomCenters(mapData, originOffset);

  svg.setAttribute("width", mapWidth.toString());
  svg.setAttribute("height", mapHeight.toString());

  return {
    originOffset,
    mapSize: { width: mapWidth, height: mapHeight },
    roomCenters,
  };
}

function initMapSize(mapData: MapData) {
  let mapMinX = 0;
  let mapMaxX = 0;
  let mapMinY = 0;
  let mapMaxY = 0;

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
  const roomCenters: { roomId: string; center: [number, number] }[] = [];
  for (const region of Object.values(mapData.regions)) {
    for (const room of region.rooms) {
      let roomMinX = 0 + originOffset[0];
      let roomMaxX = 0 + originOffset[0];
      let roomMinY = 0 + originOffset[1];
      let roomMaxY = 0 + originOffset[1];
      // Track the minX/Y and maxX/Y
      for (const vertex of room.path) {
        if (vertex[0] < roomMinX) roomMinX = vertex[0];
        if (vertex[0] > roomMaxX) roomMaxX = vertex[0];
        if (vertex[1] < roomMinY) roomMinY = vertex[1];
        if (vertex[1] > roomMaxY) roomMaxY = vertex[1];
      }
      // Find the center of those values
      const roomCenter: { roomId: string; center: [number, number] } = {
        roomId: room.id,
        center: [(roomMaxX - roomMinX) / 2, (roomMaxY - roomMinY) / 2],
      };
      roomCenters.push(roomCenter);
    }
  }
  return roomCenters;
}
