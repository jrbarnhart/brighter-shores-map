import { MapState } from "../useMapState";
import useMouseTouch from "../useMouseTouch";
import useCanvasSize from "./useCanvasSize";
import useCreateRTree from "./useCreateRTree";
import useDrawRooms from "./useDrawRooms";

export default function MapCanvas({ mapState }: { mapState: MapState }) {
  const { canvas } = mapState;
  const roomCanvasRef = canvas.rooms.ref;
  const roomCanvasSize = canvas.size.value;
  // Set canvas size
  useCanvasSize({ mapState });
  // Creates an rtree of objects with min/max x/y and room id
  useCreateRTree({ setRTree: mapState.rTree.set });
  // Draw the visible rooms
  useDrawRooms({ mapState });
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
        height={roomCanvasSize.height}
        width={roomCanvasSize.width}
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
        height={roomCanvasSize.height}
        width={roomCanvasSize.width}
        className="bg-blue-500/20 absolute top-0 left-0 pointer-events-none"
      ></canvas>
    </div>
  );
}

// This draw function should only run when needed (zoom or panning the map for example)
// It should implement request animation frame in some way to handle the draw function calls
// The map will start centred on some part of Hopeport. Default coords in mapConfig.ts
// Determine the rooms (paths) that are visible or partially visible based on coords * mapConfig.cellSize compared against the canvas size (all in px)
// Draw these paths to the canvas
