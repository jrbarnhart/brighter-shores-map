import mapConfig from "@/lib/map/mapConfig";
import mapData, { RoomData, RoomId } from "@/lib/map/mapData";
import RBush, { BBox } from "rbush";
import { SetStateAction, useEffect } from "react";

export type RoomTreeNode = BBox & {
  roomId: RoomId;
};

function createRoomTreeNode(roomData: RoomData, cellSize: number) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  const { origin } = roomData;

  for (const vertex of roomData.path) {
    const originAdjustedVertex = [vertex[0] + origin[0], vertex[1] + origin[1]];
    if (originAdjustedVertex[0] < minX) minX = originAdjustedVertex[0];
    if (originAdjustedVertex[1] < minY) minY = originAdjustedVertex[1];
    if (originAdjustedVertex[0] > maxX) maxX = originAdjustedVertex[0];
    if (originAdjustedVertex[1] > maxY) maxY = originAdjustedVertex[1];
  }

  // Adjust coords for cell size
  minX *= cellSize;
  minY *= cellSize;
  maxX *= cellSize;
  maxY *= cellSize;

  return {
    minX,
    minY,
    maxX,
    maxY,
    roomId: roomData.id as RoomId,
  } satisfies RoomTreeNode;
}

export default function useCreateRTree({
  setRTree,
}: {
  setRTree: React.Dispatch<SetStateAction<RBush<RoomTreeNode> | undefined>>;
}) {
  const { cellSize } = mapConfig;
  useEffect(() => {
    const allRoomBoxes: RoomTreeNode[] = [];
    for (const region of Object.values(mapData.regions)) {
      for (const room of region.rooms) {
        allRoomBoxes.push(createRoomTreeNode(room, cellSize));
      }
    }
    const tree = new RBush<RoomTreeNode>();
    tree.load(allRoomBoxes);
    setRTree(tree);
  }, [cellSize, setRTree]);
}
