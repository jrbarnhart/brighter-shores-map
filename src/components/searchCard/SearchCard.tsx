import { useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { MapState } from "../map/useMapState";
import { Monster, Thing } from "@/lib/types";
import { findRoomById } from "@/lib/utils";
import React from "react";
import RoomLink from "../roomLink/RoomLink";
import { Passive } from "../gameIcons/gameIcons";
import { getDamageIcon } from "../gameIcons/gameIconUtils";

const MonsterCardHeader = ({
  mapState,
  monster,
}: {
  mapState: MapState;
  monster: Monster;
}) => {
  const { selectedRoomId } = mapState;

  return (
    <>
      <CardTitle className="flex flex-nowrap justify-between items-start">
        <p className="text-nowrap overflow-hidden leading-8">
          {monster.name[0].toUpperCase() + monster.name.slice(1)}
        </p>
        {monster.aggressive && (
          <p className="text-red-600 text-base leading-none">!</p>
        )}
      </CardTitle>
      <CardDescription className="flex flex-col">
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
};

const MonsterCardContents = ({ monster }: { monster: Monster }) => {
  return (
    <>
      <div className="h-5 flex items-center gap-1 md:gap-3 text-sm max-w-md">
        {monster.passive && (
          <>
            <p>Passive</p>
            <Passive />
          </>
        )}
        {!monster.passive && (
          <>
            <p>Attack: </p>
            {getDamageIcon(monster.attackDamage)}
            {monster.vulnerableDamage && (
              <>
                <p>Weak:</p>
                {getDamageIcon(monster.vulnerableDamage)}
              </>
            )}
            {monster.immuneDamage && (
              <>
                <p>Immune:</p>
                {getDamageIcon(monster.immuneDamage)}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default function SearchCard({
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
