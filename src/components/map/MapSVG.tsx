import { useEffect, useRef } from "react";
import { drawLabels, drawRooms } from "./drawMap";
import initMap from "./initMap";
import useMouseTouch from "./useMouseTouch";
import useMapControls from "./useMapControls";
import { MapState } from "./useMapState";
import mapConfig from "@/lib/map/mapConfig";
import useAnimatedPos from "./useAnimatedPos";

export default function MapSVG({ ...props }: { mapState: MapState }) {
  const { mapState } = props;
  const dragEnabled = mapState.drag.enabledRef;
  const svgRef = useRef<SVGSVGElement | null>(null);
  const labelGroups = useRef<SVGGElement[]>([]);

  useAnimatedPos(mapState);
  const { animatedMapPos, drag, scale } = mapState;
  const isDragging = drag.enabledRef.current;
  const zoomScale = scale.value / 100;

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
        setDetailsOpen: mapState.detailsOpen.set,
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
    mapState.mapPos,
    mapState.hoveredId.set,
    mapState.isHovering.set,
    mapState.selectedId.set,
    mapState.detailsOpen.set,
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
          transform: `translate(${animatedMapPos.value.x.toString()}px, ${animatedMapPos.value.y.toString()}px) scale(${zoomScale.toString()})`,
          backgroundColor: mapConfig.bgColor,
          willChange: "transform",
        }}
      ></svg>
    </div>
  );
}
