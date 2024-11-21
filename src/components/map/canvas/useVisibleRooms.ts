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

    const { cellSize } = mapConfig;

    const bbox: BBox = {
      minX: mapPos.value.x * cellSize,
      minY: mapPos.value.y * cellSize,
      maxX: roomsCanvas.width + mapPos.value.x * cellSize,
      maxY: roomsCanvas.height + mapPos.value.y * cellSize,
    };

    console.log("Bounding box for search:", bbox); // Console
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
    rTree.value,
    roomPaths.value,
    setVisibleRooms,
  ]);
}
