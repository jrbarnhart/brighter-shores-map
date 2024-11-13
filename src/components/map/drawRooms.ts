import mapData, { RoomData } from "../../lib/mapData";
import mapConfig from "../../lib/mapConfig";

export default function drawRooms(
  svg: SVGSVGElement,
  originOffset: [number, number]
) {
  for (const room of mapData.rooms) {
    // Create the path that represents the room in the map svg
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    const pathData = generateRoomPathData(room, originOffset);
    path.setAttribute("d", pathData);

    // Add id and other attributes
    path.setAttribute("id", room.id);
    path.setAttribute("fill", "#eee");
    path.setAttribute("stroke", "#333");
    path.setAttribute("stroke-width", "2");

    // Add event listeners

    // Add path to svg
    svg.appendChild(path);
  }
}

function generateRoomPathData(room: RoomData, originOffset: [number, number]) {
  const start = room.path[0];
  // Convert numbers to strings and ensure proper spacing
  let d =
    "M " +
    (
      (room.origin[0] + originOffset[0] + start[0]) *
      mapConfig.cellSize
    ).toString() +
    " " +
    (
      (room.origin[1] + originOffset[1] + start[1]) *
      mapConfig.cellSize
    ).toString();

  // Add line segments to each vertex
  for (let i = 1; i < room.path.length; i++) {
    const point = room.path[i];
    d +=
      " L " +
      (
        (room.origin[0] + originOffset[0] + point[0]) *
        mapConfig.cellSize
      ).toString() +
      " " +
      (
        (room.origin[1] + originOffset[1] + point[1]) *
        mapConfig.cellSize
      ).toString();
  }

  // Close the path
  d += " Z";
  return d;
}
