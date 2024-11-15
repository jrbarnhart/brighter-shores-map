import { useEffect, useRef } from "react";
import { drawLabels, drawRooms } from "./drawMap";
import initMap from "./initMap";
import usePan from "./usePan";
import useZoom from "./useZoom";
import { setHiddenGroups } from "./mapControls";

export default function MapSVG({ ...props }: { labelsHidden: boolean }) {
  const { labelsHidden } = props;
  const svgRef = useRef<SVGSVGElement | null>(null);

  const labelGroups = useRef<SVGGElement[]>([]);

  // Hide labels on state change
  useEffect(() => {
    setHiddenGroups(labelGroups.current, labelsHidden);
  }, [labelsHidden]);

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    mapPos,
    isDragging,
  } = usePan();

  const { handleWheel, zoomScale } = useZoom();

  useEffect(() => {
    if (!svgRef.current) return;

    // Draw the map from the map data
    if (!svgRef.current.hasAttribute("data-drawn")) {
      const initMapValues = initMap(svgRef.current);
      drawRooms(svgRef.current, initMapValues);
      const labelGroupElements = drawLabels(svgRef.current, initMapValues);
      labelGroups.current = labelGroupElements;
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
      onWheel={handleWheel}
    >
      <svg
        ref={svgRef}
        style={{
          transform: `translate(${mapPos.x.toString()}px, ${mapPos.y.toString()}px) scale(${zoomScale.toString()})`,
        }}
      >
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          stroke="green"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
}
