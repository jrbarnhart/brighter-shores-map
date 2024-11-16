import React, { SetStateAction, useEffect, useRef } from "react";
import { drawLabels, drawRooms } from "./drawMap";
import initMap from "./initMap";
import useMouseTouch from "./useMouseTouch";
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
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleContextMenu,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove,
    handleWheel,
    zoomScale,
    mapPos,
    isDragging,
  } = useMouseTouch({ dragEnabled, mapState });

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
      className={`w-screen h-screen overflow-hidden touch-none ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onMouseDown={(e) => {
        if (e.buttons === 2) {
          dragEnabled.current = true;
        }
        if (dragEnabled.current || dragLocked) {
          handleMouseDown(e);
        }
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={(e) => {
        if (e.touches.length > 1) {
          dragEnabled.current = true;
        }
        if (dragEnabled.current || dragLocked) handleTouchStart(e);
      }}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      onContextMenu={handleContextMenu}
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
