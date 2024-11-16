import { useEffect, useRef } from "react";
import { drawLabels, drawRooms } from "./drawMap";
import initMap from "./initMap";
import usePan from "./usePan";
import useZoom from "./useZoom";
import useMapControls from "./useMapControls";
import { MapState } from "./useMapState";
import mapConfig from "@/lib/map/mapConfig";

export default function MapSVG({
  ...props
}: {
  mapState: MapState;
  dragEnabled: boolean;
}) {
  const { mapState, dragEnabled } = props;

  const svgRef = useRef<SVGSVGElement | null>(null);
  const labelGroups = useRef<SVGGElement[]>([]);

  useMapControls({ mapState, labelGroups });

  const {
    handleMouseDownPan,
    handleMouseMovePan,
    handleMouseUpPan,
    mapPos,
    isDragging,
  } = usePan();

  const { handleWheel, zoomScale } = useZoom();

  // Initialize the map elements by drawing them from data
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
      onMouseDown={(e) => {
        if (dragEnabled) {
          handleMouseDownPan(e);
        }
      }}
      onMouseMove={handleMouseMovePan}
      onMouseUp={handleMouseUpPan}
      onMouseLeave={handleMouseUpPan}
      onWheel={handleWheel}
    >
      <svg
        ref={svgRef}
        style={{
          transform: `translate(${mapPos.x.toString()}px, ${mapPos.y.toString()}px) scale(${zoomScale.toString()})`,
          backgroundColor: mapConfig.bgColor,
        }}
      ></svg>
    </div>
  );
}
