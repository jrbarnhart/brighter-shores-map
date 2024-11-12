import { useEffect, useRef } from "react";
import drawRooms from "./lib/canvas/drawRooms";
import initMap from "./lib/canvas/initMap";

function App() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Draw the map from the map data
    initMap(svgRef.current);
    drawRooms(svgRef.current);
  }, []);

  return (
    <div className="h-screen w-screen">
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default App;
