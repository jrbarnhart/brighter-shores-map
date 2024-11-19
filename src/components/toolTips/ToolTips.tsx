import { useEffect, useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { MapState } from "../map/useMapState";
import { Monster } from "@/lib/map/mapData";

export default function ToolTips({ mapState }: { mapState: MapState }) {
  // Update display data when hovered room changes
  const [cardContent, setCardContent] = useState<{ monsters: Monster[] }>({
    monsters: [],
  });

  useEffect(() => {
    // Set trigger element
    // Get the room's content
    // Find array of monsters based on content
    // Set the card content state with this array
  }, [mapState.hoveredRoomId]);

  return (
    <HoverCard>
      <HoverCardTrigger>{mapState.toolTipTrigger.value}</HoverCardTrigger>
      <HoverCardContent>
        <p>Monsters:</p>
        <p>{cardContent.monsters[0].name}</p>
      </HoverCardContent>
    </HoverCard>
  );
}
