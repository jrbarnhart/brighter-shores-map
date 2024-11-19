import { useEffect, useRef } from "react";
import { drawLabels, drawRooms } from "./drawMap";
import initMap from "./initMap";
import useMouseTouch from "./useMouseTouch";
import useMapControls from "./useMapControls";
import { MapState } from "./useMapState";
import mapConfig from "@/lib/map/mapConfig";

export default function MapSVG({ ...props }: { mapState: MapState }) {
  const { mapState } = props;
  const dragEnabled = mapState.drag.enabledRef;
  const svgRef = useRef<SVGSVGElement | null>(null);
  const labelGroups = useRef<SVGGElement[]>([]);

  useMapControls({ mapState, labelGroups });

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDoubleClick,
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
      drawRooms({
        svg: svgRef.current,
        initMapValues,
        setHoveredId: mapState.hoveredId.set,
        setIsHovering: mapState.isHovering.set,
        setSelectedId: mapState.selectedId.set,
      });
      const labelGroupElements = drawLabels(svgRef.current, initMapValues);
      labelGroups.current = labelGroupElements;
      mapState.mapPos.set({
        x: -(initMapValues.mapSize.width / 2 - window.innerWidth / 2),
        y: -(initMapValues.mapSize.height / 2 - window.innerHeight / 2),
      });
      svgRef.current.setAttribute("data-drawn", "true");
    }
  }, [
    mapState.hoveredId.set,
    mapState.isHovering.set,
    mapState.mapPos,
    mapState.selectedId.set,
  ]);

  return (
    <div
      className={`w-screen h-screen overflow-hidden touch-none ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDoubleClick={handleDoubleClick}
      onTouchStart={handleTouchStart}
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
