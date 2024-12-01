import mapData from "@/lib/map/mapData";
import { Room, RoomTreeNode } from "@/lib/types";
import RBush from "rbush";
import { SetStateAction, useEffect } from "react";

function createRoomTreeNode(room: Room) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  const { origin } = room;

  for (const vertex of room.path) {
    const originAdjustedVertex = [vertex[0] + origin[0], vertex[1] + origin[1]];
    if (originAdjustedVertex[0] < minX) minX = originAdjustedVertex[0];
    if (originAdjustedVertex[1] < minY) minY = originAdjustedVertex[1];
    if (originAdjustedVertex[0] > maxX) maxX = originAdjustedVertex[0];
    if (originAdjustedVertex[1] > maxY) maxY = originAdjustedVertex[1];
  }

  return {
    minX,
    minY,
    maxX,
    maxY,
    roomId: room.id,
  } satisfies RoomTreeNode;
}

export default function useCreateRTree({
  setRTree,
}: {
  setRTree: React.Dispatch<SetStateAction<RBush<RoomTreeNode> | undefined>>;
}) {
  useEffect(() => {
    const allRoomBoxes: RoomTreeNode[] = [];
    for (const region of Object.values(mapData.regions)) {
      for (const room of region.rooms) {
        allRoomBoxes.push(createRoomTreeNode(room));
      }
    }
    const tree = new RBush<RoomTreeNode>();
    tree.load(allRoomBoxes);
    setRTree(tree);
  }, [setRTree]);
}
