import { useEffect, useRef } from "react";
import drawRooms from "./drawRooms";
import initMap from "./initMap";

export default function MapSVG() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Draw the map from the map data
    initMap(svgRef.current);
    drawRooms(svgRef.current);
  }, []);

  return <svg ref={svgRef}></svg>;
}
