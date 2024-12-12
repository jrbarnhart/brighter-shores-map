import { MapState } from "@/components/map/useMapState";
import RoomLink from "@/components/roomLink/RoomLink";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Monster } from "@/lib/types";
import { findRoomById } from "@/lib/utils";
import React from "react";
import useThingCardContext from "../useThingCardContext";

export default function MonsterCardHeader({
  monster,
  mapState,
}: {
  monster: Monster;
  mapState: MapState;
}) {
  const { selectedRoomId } = mapState;
  const { expandedCardId } = useThingCardContext();
  const isExpanded = monster.name === expandedCardId;

  return (
    <>
      <CardTitle className="flex flex-nowrap justify-between items-start">
        <p className="text-nowrap overflow-hidden">
          {monster.name[0].toUpperCase() + monster.name.slice(1)}
        </p>
        {monster.aggressive && (
          <p className="text-red-600 text-base leading-none">
            {isExpanded ? "Aggressive!" : "!"}
          </p>
        )}
      </CardTitle>
      <CardDescription className="flex flex-col">
        {isExpanded && <p className="text-sidebar-foreground">Locations:</p>}
        <div>
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
        </div>
      </CardDescription>
    </>
  );
}
