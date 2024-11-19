import hopeportContentData from "./hopeport/hopeportContentData";
import { RoomId } from "./mapData";

// Get the top level contents
export function getRoomContent(searchId: RoomId | null) {
  return hopeportContentData.find((data) => data.roomId === searchId);
}

// Get detailed contents with specific functions
// get monsters
// get resources
// get npcs
// etc
