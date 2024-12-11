import { MapState } from "@/components/map/useMapState";
import RoomLink from "@/components/roomLink/RoomLink";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Monster } from "@/lib/types";
import { findRoomById } from "@/lib/utils";
import React from "react";

export default function MonsterCardHeader({
  monster,
  mapState,
}: {
  monster: Monster;
  mapState: MapState;
}) {
  const { selectedRoomId } = mapState;
  return (
    <>
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
    </>
  );
}
