import { useCallback, useEffect, useRef, useState } from "react";
import drawRooms from "./drawRooms";
import initMap from "./initMap";

export default function MapSVG() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [mapPos, setMapPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      dragStart.current = {
        x: e.clientX - mapPos.x,
        y: e.clientY - mapPos.y,
      };
    },
    [mapPos]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - dragStart.current.x;
      const newY = e.clientY - dragStart.current.y;

      // Add bounds checking here if needed
      setMapPos({ x: newX, y: newY });
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!svgRef.current) return;

    // Draw the map from the map data
    initMap(svgRef.current);
    drawRooms(svgRef.current);
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
