import { BBox } from "rbush";
import { MapState } from "../useMapState";
import { useEffect } from "react";

export default function useVisibleRooms({ mapState }: { mapState: MapState }) {
  const {
    rTree,
    canvas,
    mapPos,
    visibleRoomPaths,
    roomPaths,
    currentCellSize,
  } = mapState;
  const setVisibleRooms = visibleRoomPaths.set;

  useEffect(() => {
    const roomsCanvas = canvas.rooms.ref.current;
    if (!roomsCanvas || !rTree.value) return;

    // Convert canvas dimensions to normalized cell space
    const canvasWidthInCells = roomsCanvas.width / currentCellSize.value;
    const canvasHeightInCells = roomsCanvas.height / currentCellSize.value;

    const bbox: BBox = {
      minX: mapPos.value.x,
      minY: mapPos.value.y,
      maxX: mapPos.value.x + canvasWidthInCells,
      maxY: mapPos.value.y + canvasHeightInCells,
    };

    const foundRoomIds = rTree.value
      .search(bbox)
      .map((foundNode) => foundNode.roomId);

    const result = roomPaths.value.filter((path) =>
      foundRoomIds.includes(path.roomId)
    );

    setVisibleRooms(result);
  }, [
    canvas.rooms.ref,
    currentCellSize.value,
    mapPos.value.x,
    mapPos.value.y,
    rTree.value,
    roomPaths.value,
    setVisibleRooms,
  ]);
}
