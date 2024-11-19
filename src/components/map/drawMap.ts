import mapData, { RoomData, RoomId } from "../../lib/map/mapData";
import mapConfig from "../../lib/map/mapConfig";
import { InitializedMapValues, RoomCenter } from "./initMap";
import { SetStateAction } from "react";

export function drawRooms({
  ...args
}: {
  svg: SVGSVGElement;
  initMapValues: InitializedMapValues;
  setHoveredId: React.Dispatch<SetStateAction<RoomId | null>>;
  setIsHovering: React.Dispatch<SetStateAction<boolean>>;
  setSelectedId: React.Dispatch<SetStateAction<RoomId | null>>;
}) {
  const { svg, initMapValues, setHoveredId, setIsHovering, setSelectedId } =
    args;
  const { originOffset } = initMapValues;
  const roomPathElements = [];
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
      path.setAttribute("fill", room.color ?? mapConfig.defaultColor);
      path.setAttribute("stroke", "#333");
      path.setAttribute("stroke-width", "2");
      path.setAttribute(
        "class",
        "hover:stroke-sidebar-accent hover:fill-sidebar"
      );

      // Add event listeners here
      path.addEventListener("mouseover", () => {
        setHoveredId(room.id as RoomId);
        setIsHovering(true);
      });

      path.addEventListener("mouseleave", () => {
        setHoveredId(null);
        setIsHovering(false);
      });

      path.addEventListener("mousedown", (e) => {
        if (e.buttons === 1) {
          setSelectedId(room.id as RoomId);
        }
      });

      // Add path to svg
      svg.appendChild(path);
      roomPathElements.push(path);
    }
  }
  return roomPathElements;
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
  const labelGroupElements = [];
  for (const region of Object.values(mapData.regions)) {
    for (const room of region.rooms) {
      const label = generateRoomLabel(room, roomCenters);
      svg.appendChild(label);
      labelGroupElements.push(label);
    }
  }

  return labelGroupElements;
}

function generateRoomLabel(room: RoomData, roomCenters: RoomCenter[]) {
  const roomCenter = roomCenters.find((center) => center.roomId === room.id);
  const [x, y] = roomCenter?.center ?? [0, 0];

  // Label position modifiers
  const defaultXMod = 0;
  const defaultYMod = 0;
  const [xMod, yMod] = room.labelOffset ?? [defaultXMod, defaultYMod];

  // Max width before wrapping
  const maxWidth = 100;
  const padding = 8;
  const lineHeight = 20;

  // Split text into words for wrapping
  const words = room.label.split(" ");
  let currentLine = "";
  const lines = [];
  let maxLineWidth = 0;

  words.forEach((word, index) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    const testWidth = testLine.length * 10;

    if (testWidth <= maxWidth && words.length) {
      currentLine = testLine;
    } else if (words.length === 1 || index === 0) {
      currentLine = testLine;
    } else {
      lines.push(currentLine);
      maxLineWidth = Math.max(maxLineWidth, currentLine.length * 10);
      currentLine = word;
    }
  });
  if (currentLine) {
    lines.push(currentLine);
    maxLineWidth = Math.max(maxLineWidth, currentLine.length * 10);
  }

  // Calculate bg dimensions
  const textWidth = Math.min(maxWidth, maxLineWidth);
  const textHeight = lineHeight * lines.length;

  // Create bg rect
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute(
    "x",
    (x * mapConfig.cellSize + xMod - textWidth / 2 - padding).toString()
  );
  rect.setAttribute(
    "y",
    (y * mapConfig.cellSize + yMod - textHeight / 2 - padding).toString()
  );
  rect.setAttribute("width", (textWidth + 2 * padding).toString());
  rect.setAttribute("height", (textHeight + 2 * padding).toString());
  rect.setAttribute("rx", "5");
  rect.setAttribute("ry", "5");
  rect.setAttribute("class", "fill-zinc-900");

  // Create text
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", (x * mapConfig.cellSize + xMod).toString());
  text.setAttribute(
    "y",
    (y * mapConfig.cellSize + yMod - textHeight / 2 + lineHeight / 2).toString()
  );
  text.setAttribute("class", "fill-blue-100 font-bold select-none");
  text.setAttribute("text-anchor", "middle");

  // Add lines to text
  lines.forEach((line, index) => {
    {
      const tspan = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "tspan"
      );
      tspan.textContent = line;
      tspan.setAttribute("x", (x * mapConfig.cellSize + xMod).toString());
      tspan.setAttribute("dy", index === 0 ? "0" : lineHeight.toString());
      tspan.setAttribute("dominant-baseline", "middle");
      text.appendChild(tspan);
    }
  });

  // Group elements
  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  group.setAttribute("class", "pointer-events-none");
  group.appendChild(rect);
  group.appendChild(text);
  return group;
}
