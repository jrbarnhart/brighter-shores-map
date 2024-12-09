import { Monster } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import RoomLink from "../roomLink/RoomLink";
import { MapState } from "../map/useMapState";
import { findRoomById } from "@/lib/utils";
import { Impact, Necromae, Tempestae } from "../gameIcons/gameIcons";
import useThingCardContext from "./useThingCardContext";
import React from "react";

export default function MonsterCard({
  monster,
  mapState,
}: {
  monster: Monster;
  mapState: MapState;
}) {
  const { selectedRoomId } = mapState;
  const { expandedCardId, setExpandedCardId } = useThingCardContext();

  const handleClick = () => {
    setExpandedCardId((prev) => {
      if (prev === monster.name) {
        return null;
      }
      return monster.name;
    });
  };

  return (
    <div
      className={
        expandedCardId === monster.name
          ? "w-full h-full fixed top-0 left-0 flex items-center justify-center touch-none"
          : ""
      }
    >
      <Card
        onClick={handleClick}
        className={`${
          expandedCardId === monster.name
            ? "w-screen max-w-[640px] h-screen max-h-[360px] m-3"
            : ""
        } bg-sidebar border-sidebar-border text-sidebar-foreground`}
      >
        <CardHeader className="p-3">
          <CardTitle>
            {monster.name[0].toUpperCase() + monster.name.slice(1)}
          </CardTitle>
          <CardDescription>
            {monster.locations.map((location, index) => {
              const room = findRoomById(mapState.roomPaths.value, location);
              return (
                <React.Fragment key={index}>
                  <RoomLink
                    text={room ? room.label : location}
                    roomId={location}
                    setSelectedRoomId={selectedRoomId.set}
                  />
                  {monster.locations.length - 1 > index ? ", " : ""}
                </React.Fragment>
              );
            })}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-12 p-3 pt-0 flex items-center justify-between gap-1 text-sm">
          <p>Attack: </p>
          <Impact />
          <p>Immune: </p>
          <Tempestae />
          <p>Weak: </p>
          <Necromae />
        </CardContent>
      </Card>
    </div>
  );
}
