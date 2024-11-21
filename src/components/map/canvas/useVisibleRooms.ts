import { BBox } from "rbush";
import { MapState } from "../useMapState";
import { useEffect } from "react";

export default function useVisibleRooms({ mapState }: { mapState: MapState }) {
  const { rTree, canvas, mapPos, visibleRoomPaths, roomPaths } = mapState;
  const setVisibleRooms = visibleRoomPaths.set;
  useEffect(() => {
    const roomsCanvas = canvas.rooms.ref.current;
    if (!roomsCanvas || !rTree.value) return;

    const currentCellSize = mapState.currentCellSize.value;

    const bbox: BBox = {
      minX: mapPos.value.x * currentCellSize,
      minY: mapPos.value.y * currentCellSize,
      maxX: roomsCanvas.width + mapPos.value.x * currentCellSize,
      maxY: roomsCanvas.height + mapPos.value.y * currentCellSize,
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
    canvas.rooms.size.value,
    mapPos.value.x,
    mapPos.value.y,
    mapState.currentCellSize.value,
    rTree.value,
    roomPaths.value,
    setVisibleRooms,
  ]);
}
