import { BBox } from "rbush";
import { MapState } from "../useMapState";
import { useEffect } from "react";
import mapConfig from "@/lib/map/mapConfig";

export default function useVisibleRooms({ mapState }: { mapState: MapState }) {
  const { rTree, canvas, mapPos, visibleRoomPaths, roomPaths } = mapState;
  const setVisibleRooms = visibleRoomPaths.set;
  useEffect(() => {
    const roomsCanvas = canvas.rooms.ref.current;
    if (!roomsCanvas || !rTree.value) return;

    const bbox: BBox = {
      minX: mapPos.value.x,
      minY: mapPos.value.y,
      maxX: roomsCanvas.width / mapConfig.cellSize - mapPos.value.x,
      maxY: roomsCanvas.height / mapConfig.cellSize - mapPos.value.y,
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
    mapPos.value.x,
    mapPos.value.y,
    rTree.value,
    roomPaths.value,
    setVisibleRooms,
  ]);
}
