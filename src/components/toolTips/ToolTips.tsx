import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { MapState } from "../map/useMapState";
import { getRoomContent, getRoomLabel } from "@/lib/map/mapDataUtils";
import CloseButton from "../ui/CloseButton";

export default function ToolTips({ mapState }: { mapState: MapState }) {
  const { selectedId, detailsOpen } = mapState;
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
        detailsOpen.value ? "" : "opacity-0"
      } transition-opacity w-full min-h-40 absolute bottom-0 z-20 pointer-events-none grid justify-center`}
    >
      <Card className="h-full w-min min-w-80 bg-sidebar text-sidebar-foreground border-sidebar-accent pointer-events-auto">
        <CardHeader>
          <div className="flex justify-between gap-3 items-center">
            <CardTitle className="h-6 text-nowrap">
              {cardContent.roomLabel}
            </CardTitle>
            <CloseButton setOpenState={detailsOpen.set} />
          </div>
        </CardHeader>
        <CardContent className="z-10">
          <p>Monsters:</p>
          <p>{cardContent.monsters.map((monster) => monster.toString())}</p>
        </CardContent>
      </Card>
    </div>
  );
}
