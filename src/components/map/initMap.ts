import mapConfig from "@/lib/map/mapConfig";
import mapData, { MapData } from "@/lib/map/mapData";

export default function initMap(svg: SVGSVGElement) {
  const { originOffset, mapHeight, mapWidth } = initMapSize(mapData);

  svg.setAttribute("width", mapWidth.toString());
  svg.setAttribute("height", mapHeight.toString());

  return {
    originOffset,
    mapSize: { width: mapWidth, height: mapHeight },
  };
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
