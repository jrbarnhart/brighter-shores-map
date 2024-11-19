import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { MapState } from "../map/useMapState";
import { getRoomContent, getRoomLabel } from "@/lib/map/mapDataUtils";

export default function ToolTips({ mapState }: { mapState: MapState }) {
  const { selectedId } = mapState;
  const [cardContent, setCardContent] = useState<{
    roomLabel: string;
    monsters: string[];
  }>({
    roomLabel: "Not Selected",
    monsters: [],
  });

  useEffect(() => {
    setCardContent(() => {
      const roomContent = getRoomContent(selectedId.value);
      const roomLabel = getRoomLabel(selectedId.value);
      return { roomLabel, monsters: roomContent?.monsters ?? ["None"] };
    });
  }, [selectedId.value]);

  return (
    <div
      className={`${
        selectedId.value ? "" : "opacity-0"
      } transition-opacity w-full min-h-40 absolute bottom-0 z-20 pointer-events-none grid justify-center`}
    >
      <Card className="h-full w-min min-w-80 bg-sidebar text-sidebar-foreground border-sidebar-accent pointer-events-auto">
        <CardHeader>
          <CardTitle className="h-6">{cardContent.roomLabel}</CardTitle>
        </CardHeader>
        <CardContent className="z-10">
          <p>Monsters:</p>
          <p>{cardContent.monsters.map((monster) => monster.toString())}</p>
        </CardContent>
      </Card>
    </div>
  );
}
