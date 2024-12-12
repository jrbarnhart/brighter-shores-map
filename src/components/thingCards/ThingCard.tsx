import { Thing } from "@/lib/types";
import { Card, CardContent, CardHeader } from "../ui/card";
import { MapState } from "../map/useMapState";
import useThingCardContext from "./useThingCardContext";
import MonsterCardHeader from "./monsters/MonsterCardHeader";
import MonsterCardContents from "./monsters/MonsterCardContents";
import React, { useCallback } from "react";
import { X } from "lucide-react";

export default function ThingCard({
  thing,
  mapState,
}: {
  thing: Thing;
  mapState: MapState;
}) {
  const { expandedCardId, setExpandedCardId } = useThingCardContext();

  const handleClick = useCallback(() => {
    if (expandedCardId) {
      setExpandedCardId(null);
    } else {
      setExpandedCardId(thing.name);
    }
  }, [expandedCardId, setExpandedCardId, thing.name]);

  const handleCardClick = useCallback(
    (e: React.MouseEvent) => {
      if (expandedCardId) {
        e.stopPropagation();
      }
    },
    [expandedCardId]
  );

  return (
    <div
      onClick={handleClick}
      className={
        expandedCardId === thing.name
          ? "w-full h-full fixed top-0 left-0 flex items-center justify-center touch-none bg-black/80 backdrop-blur-sm"
          : ""
      }
    >
      <Card
        onClick={handleCardClick}
        className={`${
          expandedCardId === thing.name
            ? "w-screen max-w-[640px] h-screen max-h-[360px] m-5 scale-105"
            : "scale-100"
        } bg-sidebar border-sidebar-border text-sidebar-foreground transition-transform ease-in flex flex-col`}
      >
        {expandedCardId && (
          <div
            onClick={handleClick}
            className="absolute -top-6 right-0 flex gap-2"
          >
            <p>Close</p>
            <X />
          </div>
        )}
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
