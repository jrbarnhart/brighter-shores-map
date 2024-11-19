import { useEffect, useState } from "react";
import { HoverCard, HoverCardContent } from "../ui/hover-card";
import { MapState } from "../map/useMapState";
import { getRoomContent } from "@/lib/map/mapDataUtils";

export default function ToolTips({ mapState }: { mapState: MapState }) {
  const { isHovering, hoveredId } = mapState;
  const [cardContent, setCardContent] = useState<{ monsters: string[] }>({
    monsters: [],
  });

  useEffect(() => {
    setCardContent(() => {
      const roomContent = getRoomContent(hoveredId.value);
      return { monsters: roomContent?.monsters ?? ["None"] };
    });
  }, [hoveredId.value]);

  return (
    <HoverCard open={isHovering.value}>
      <HoverCardContent className="z-20 translate-x-0">
        <p>{hoveredId.value ?? ""}</p>
        <p>Monsters:</p>
        <p>{cardContent.monsters.map((monster) => monster.toString())}</p>
      </HoverCardContent>
    </HoverCard>
  );
}
