import { useRef } from "react";
import { MapState } from "../useMapState";
import useCreateRoomPaths from "./useCreateRoomPaths";
import useCreateRTree from "./useCreateRTree";

export default function MapCanvas({ mapState }: { mapState: MapState }) {
  const roomCanvasRef = useRef<HTMLCanvasElement>(null);

  // Computes path2D's and set them to state
  useCreateRoomPaths({ setRoomPaths: mapState.roomPaths.set });
  useCreateRTree({ setRTree: mapState.rTree.set });

  return <canvas ref={roomCanvasRef}></canvas>;
}

// This draw function should only run when needed (zoom or panning the map for example)
// It should implement request animation frame in some way to handle the draw function calls
// The map will start centred on some part of Hopeport. Default coords in mapConfig.ts
// Determine the rooms (paths) that are visible or partially visible based on coords * mapConfig.cellSize compared against the canvas size (all in px)
// Draw these paths to the canvas
