import mapConfig from "@/lib/mapConfig";
import mapData from "@/lib/mapData";

export default function initMap(svg: SVGSVGElement) {
  let mapMinX = Infinity;
  let mapMaxX = -Infinity;
  let mapMinY = Infinity;
  let mapMaxY = -Infinity;

  for (const room of mapData.rooms) {
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

  const originOffset: [number, number] = [-mapMinX, -mapMinY];
  const mapWidth = (mapMaxX - mapMinX) * mapConfig.cellSize;
  const mapHeight = (mapMaxY - mapMinY) * mapConfig.cellSize;

  svg.setAttribute("width", mapWidth.toString());
  svg.setAttribute("height", mapHeight.toString());

  return {
    originOffset,
    mapSize: { width: mapWidth, height: mapHeight },
  };
}
