import { useCallback } from "react";
import MonsterCardContents from "../thingCards/monsters/MonsterCardContents";
import MonsterCardHeader from "../thingCards/monsters/MonsterCardHeader";
import { Card, CardContent, CardHeader } from "../ui/card";
import { MapState } from "../map/useMapState";
import { Thing } from "@/lib/types";

export default function ExpandedCard({
  mapState,
  thing,
}: {
  mapState: MapState;
  thing: Thing;
}) {
  const setExpandedCardThing = mapState.expandedCardThing.set;

  const handleClick = useCallback(() => {
    setExpandedCardThing(thing);
  }, [setExpandedCardThing, thing]);

  return (
    <Card
      onClick={handleClick}
      className="bg-sidebar border-sidebar-border text-sidebar-foreground flex flex-col"
    >
      <CardHeader className="px-3 py-2 md:p-4">
        {thing.type === "monster" && (
          <MonsterCardHeader
            monster={thing}
            mapState={mapState}
            key={thing.name}
          />
        )}
      </CardHeader>
      <CardContent className="px-3 pb-1 md:px-4 md:pb-2 flex flex-col gap-4 flex-grow overflow-hidden">
        {thing.type === "monster" && <MonsterCardContents monster={thing} />}
      </CardContent>
    </Card>
  );
}
