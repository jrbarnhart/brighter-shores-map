import { MapState } from "../useMapState";
import useMouseTouch from "../useMouseTouch";
import useCanvasSize from "./useCanvasSize";
import useCreateRoomPaths from "./useCreateRoomPaths";
import useCreateRTree from "./useCreateRTree";
import useDrawRooms from "./useDrawRooms";
import useVisibleRooms from "./useVisibleRooms";

export default function MapCanvas({ mapState }: { mapState: MapState }) {
  const { canvas } = mapState;
  const roomCanvasRef = canvas.rooms.ref;
  const roomCanvasSize = canvas.rooms.size.value;
  // Set canvas size
  useCanvasSize({ mapState });
  // Computes path2D's and set them to state
  useCreateRoomPaths({ mapState });
  // Creates an rtree of objects with min/max x/y and room id
  useCreateRTree({ setRTree: mapState.rTree.set });
  // Search the rtree for the visible rooms
  useVisibleRooms({ mapState });
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
  } = useMouseTouch({ mapState });

  return (
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
    ></canvas>
  );
}

// This draw function should only run when needed (zoom or panning the map for example)
// It should implement request animation frame in some way to handle the draw function calls
// The map will start centred on some part of Hopeport. Default coords in mapConfig.ts
// Determine the rooms (paths) that are visible or partially visible based on coords * mapConfig.cellSize compared against the canvas size (all in px)
// Draw these paths to the canvas
