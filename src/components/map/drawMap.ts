import mapData, { RoomData } from "../../lib/map/mapData";
import mapConfig from "../../lib/map/mapConfig";
import { InitializedMapValues, RoomCenter } from "./initMap";

export function drawRooms(
  svg: SVGSVGElement,
  initMapValues: InitializedMapValues
) {
  const { originOffset } = initMapValues;
  for (const region of Object.values(mapData.regions)) {
    for (const room of region.rooms) {
      // Create the path that represents the room in the map svg
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      const pathData = generateRoomPathData(room, originOffset);
      path.setAttribute("d", pathData);

      // Add id and other attributes
      path.setAttribute("id", room.id);
      path.setAttribute("fill", "#eee");
      path.setAttribute("stroke", "#333");
      path.setAttribute("stroke-width", "2");

      // Add event listeners here

      // Add path to svg
      svg.appendChild(path);
    }
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

export function drawLabels(
  svg: SVGSVGElement,
  initMapValues: InitializedMapValues
) {
  const { roomCenters } = initMapValues;
  for (const region of Object.values(mapData.regions)) {
    for (const room of region.rooms) {
      const label = generateRoomLabel(room, roomCenters);
      svg.appendChild(label);
    }
  }
}

function generateRoomLabel(room: RoomData, roomCenters: RoomCenter[]) {
  const roomCenter = roomCenters.find((center) => center.roomId === room.id);
  const [x, y] = roomCenter?.center ?? [0, 0];

  // Label position modifiers
  const defaultXMod = room.label.length * -5;
  const defaultYMod = -32;
  const [xMod, yMod] = room.labelOffset ?? [defaultXMod, defaultYMod];

  // Calculate bg dimensions
  const padding = 4;
  const textWidth = room.label.length * 10;
  const textHeight = 20;

  // Create bg rect
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", (x * mapConfig.cellSize + xMod - padding).toString());
  rect.setAttribute(
    "y",
    (y * mapConfig.cellSize + yMod - textHeight + padding).toString()
  );
  rect.setAttribute("width", (textWidth + 2 * padding).toString());
  rect.setAttribute("height", (textHeight + 2 * padding).toString());
  rect.setAttribute("rx", "5");
  rect.setAttribute("ry", "5");
  rect.setAttribute("class", "fill-gray-800");

  // Create text
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.textContent = room.label;
  text.setAttribute("x", (x * mapConfig.cellSize + xMod).toString());
  text.setAttribute("y", (y * mapConfig.cellSize + yMod).toString());
  text.setAttribute("class", "fill-green-300 font-bold");

  // Group elements
  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  group.appendChild(rect);
  group.appendChild(text);
  return group;
}
