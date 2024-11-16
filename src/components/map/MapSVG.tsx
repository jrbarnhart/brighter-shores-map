import React, { SetStateAction, useEffect, useRef } from "react";
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
  dragEnabled: React.MutableRefObject<boolean>;
  dragLocked: boolean;
  setDragLocked: React.Dispatch<SetStateAction<boolean>>;
}) {
  const { mapState, dragEnabled, dragLocked } = props;

  const svgRef = useRef<SVGSVGElement | null>(null);
  const labelGroups = useRef<SVGGElement[]>([]);

  useMapControls({ mapState, labelGroups });

  const {
    handleMouseDownPan,
    handleMouseMovePan,
    handleMouseUpPan,
    mapPos,
    isDragging,
  } = usePan({ dragEnabled });

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
        if (e.buttons === 2) {
          dragEnabled.current = true;
        }
        if (dragEnabled.current || dragLocked) {
          handleMouseDownPan(e);
        }
      }}
      onMouseMove={handleMouseMovePan}
      onMouseUp={handleMouseUpPan}
      onMouseLeave={handleMouseUpPan}
      onWheel={handleWheel}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
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
