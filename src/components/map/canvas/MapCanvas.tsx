import { MapState } from "../useMapState";
import mapConfig from "@/lib/map/mapConfig";
import useMouseTouch from "../useMouseTouch";
import useCanvasSize from "./useCanvasSize";
import useCreateRTree from "./useCreateRTree";
import useDrawMap from "./useDrawMap";

export default function MapCanvas({ mapState }: { mapState: MapState }) {
  const { canvas, labelsHidden } = mapState;
  const canvasSize = canvas.size.value;
  const roomCanvasRef = canvas.rooms.ref;
  const labelsCanvasRef = canvas.labels.ref;

  // Set canvas size
  useCanvasSize({ mapState });
  // Creates an rtree of objects with min/max x/y and room id
  useCreateRTree({ setRTree: mapState.rTree.set });
  // Draw the map
  useDrawMap({ mapState, mapConfig });
  // Get handler functions for map controls
  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleDoubleClick,
    handleWheel,
    handleContextMenu,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useMouseTouch({ mapState });

  return (
    <div className="touch-none relative">
      <canvas
        ref={roomCanvasRef}
        height={canvasSize.height}
        width={canvasSize.width}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onDoubleClick={handleDoubleClick}
        onWheel={handleWheel}
        onContextMenu={handleContextMenu}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      ></canvas>
      <canvas
        ref={labelsCanvasRef}
        height={canvasSize.height}
        width={canvasSize.width}
        className={`absolute top-0 left-0 pointer-events-none ${
          labelsHidden.value ? "scale-0" : ""
        }`}
      />
    </div>
  );
}
