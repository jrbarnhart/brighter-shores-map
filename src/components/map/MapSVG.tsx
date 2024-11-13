import { useEffect, useRef } from "react";
import drawRooms from "./drawRooms";
import initMap from "./initMap";
import usePan from "./usePan";

export default function MapSVG() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    mapPos,
    isDragging,
  } = usePan();

  useEffect(() => {
    if (!svgRef.current) return;

    // Draw the map from the map data
    if (!svgRef.current.hasAttribute("data-drawn")) {
      initMap(svgRef.current);
      drawRooms(svgRef.current);
      svgRef.current.setAttribute("data-drawn", "true");
    }
  }, []);

  return (
    <div
      className={`w-screen h-screen overflow-hidden ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <svg
        ref={svgRef}
        style={{
          transform: `translate(${mapPos.x.toString()}px, ${mapPos.y.toString()}px)`,
        }}
      ></svg>
    </div>
  );
}
