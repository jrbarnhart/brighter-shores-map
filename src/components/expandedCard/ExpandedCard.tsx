import { useCallback } from "react";
import MonsterCardContents from "../thingCards/monsters/MonsterCardContents";
import MonsterCardHeader from "../thingCards/monsters/MonsterCardHeader";
import { Card, CardContent, CardHeader } from "../ui/card";
import { MapState } from "../map/useMapState";
import { X } from "lucide-react";

export default function ExpandedCard({ mapState }: { mapState: MapState }) {
  const { expandedCardThing } = mapState;
  const handleClick = useCallback(() => {
    if (expandedCardThing.value) {
      expandedCardThing.set(null);
    }
  }, [expandedCardThing]);

  const handleCardClick = useCallback(
    (e: React.MouseEvent) => {
      if (expandedCardThing.value) {
        e.stopPropagation();
      }
    },
    [expandedCardThing.value]
  );

  if (expandedCardThing.value) {
    return (
      <div
        onClick={handleClick}
        className="w-full h-full fixed top-0 left-0 flex items-center justify-center touch-none bg-black/80 backdrop-blur-sm"
      >
        <Card
          onClick={handleCardClick}
          className="w-screen max-w-[640px] h-screen max-h-[360px] m-5 scale-105 bg-sidebar border-sidebar-border text-sidebar-foreground transition-transform ease-in flex flex-col"
        >
          <div
            onClick={handleClick}
            className="absolute -top-7 right-0 flex gap-2"
          >
            <p>Close</p>
            <X />
          </div>

          <CardHeader className="px-3 py-2 md:p-4">
            {expandedCardThing.value.type === "monster" && (
              <MonsterCardHeader
                monster={expandedCardThing.value}
                mapState={mapState}
                key={expandedCardThing.value.name}
              />
            )}
          </CardHeader>
          <CardContent className="px-3 pb-1 md:px-4 md:pb-2 flex flex-col gap-4 flex-grow overflow-hidden">
            {expandedCardThing.value.type === "monster" && (
              <MonsterCardContents monster={expandedCardThing.value} />
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
  return null;
}
