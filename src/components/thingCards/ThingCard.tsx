import { Thing } from "@/lib/types";
import { Card, CardContent, CardHeader } from "../ui/card";
import { MapState } from "../map/useMapState";
import useThingCardContext from "./useThingCardContext";
import MonsterCardHeader from "./monsters/MonsterCardHeader";
import MonsterCardContents from "./monsters/MonsterCardContents";
import { useCallback } from "react";

export default function ThingCard({
  thing,
  mapState,
}: {
  thing: Thing;
  mapState: MapState;
}) {
  const { expandedCardId, setExpandedCardId } = useThingCardContext();

  const handleClick = useCallback(() => {
    setExpandedCardId((prev) => {
      // Probably should be a unique id of some kind but for now all thing names are unique so it works.
      if (prev === thing.name) {
        return null;
      }
      return thing.name;
    });
  }, [setExpandedCardId, thing.name]);

  return (
    <div
      className={
        expandedCardId === thing.name
          ? "w-full h-full fixed top-0 left-0 flex items-center justify-center touch-none bg-black/80 backdrop-blur-sm"
          : ""
      }
    >
      <Card
        onClick={handleClick}
        className={`${
          expandedCardId === thing.name
            ? "w-screen max-w-[640px] h-screen max-h-[360px] m-5 scale-105"
            : "scale-100"
        } bg-sidebar border-sidebar-border text-sidebar-foreground transition-transform ease-in flex flex-col`}
      >
        <CardHeader className="px-3 py-2 md:p-6">
          {thing.type === "monster" && (
            <MonsterCardHeader
              monster={thing}
              mapState={mapState}
              key={thing.name}
            />
          )}
        </CardHeader>
        <CardContent className="px-3 pb-1 md:px-6 md:pb-3 flex flex-col gap-4 flex-grow overflow-hidden">
          {thing.type === "monster" && <MonsterCardContents monster={thing} />}
        </CardContent>
      </Card>
    </div>
  );
}
