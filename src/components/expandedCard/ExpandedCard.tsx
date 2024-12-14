import React, { useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { MapState } from "../map/useMapState";
import { X } from "lucide-react";
import { Monster, RoomContentAndData } from "@/lib/types";
import { Guard, Passive } from "../gameIcons/gameIcons";
import { getDamageIcon } from "../gameIcons/gameIconUtils";
import RoomLink from "../roomLink/RoomLink";
import { findRoomById } from "@/lib/utils";

const RoomCardHeader = ({
  roomContentAndData,
}: {
  roomContentAndData: RoomContentAndData;
}) => {
  return (
    <>
      <CardTitle>{roomContentAndData.data.label}</CardTitle>
    </>
  );
};

const RoomCardContent = ({
  roomContentAndData,
}: {
  roomContentAndData: RoomContentAndData;
}) => {
  return (
    <>
      {roomContentAndData.content.monsters &&
        roomContentAndData.content.monsters.map((monster) => {
          return (
            <div
              key={monster}
              className="h-10 flex items-center gap-1 md:gap-3"
            >
              <Guard />
              {monster[0].toUpperCase() + monster.slice(1)}
            </div>
          );
        })}
    </>
  );
};

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
          <p className="text-red-600 text-base leading-none">Aggressive!</p>
        )}
      </CardTitle>
      <CardDescription className="flex flex-col">
        <p className="text-sidebar-foreground">Locations:</p>
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

const MonsterCardContent = ({ monster }: { monster: Monster }) => {
  return (
    <>
      <div className="h-10 flex items-center gap-1 md:gap-3 text-sm max-w-md">
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

      <div className="border-sidebar-border border rounded-md p-2 -mx-2 flex-grow overflow-y-auto overflow-x-hidden">
        <div className="grid grid-cols-[3fr_1fr_1fr] gap-x-2 border-b-2 border-sidebar-border">
          <p>Variant:</p>
          <p>Lvl</p>
          <p className="text-nowrap">🔒 Lvl</p>
        </div>
        <div className="grid grid-cols-[3fr_1fr_1fr] gap-x-2 text-sm">
          {monster.variants.map((variant) => (
            <React.Fragment key={variant.name}>
              <p>{variant.name[0].toUpperCase() + variant.name.slice(1)}</p>
              <p>{variant.monsterLevel}</p>
              <p>{variant.unlockLevel}</p>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

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
            {expandedCardThing.value.type === "room" && (
              <RoomCardHeader roomContentAndData={expandedCardThing.value} />
            )}
          </CardHeader>
          <CardContent className="px-3 pb-1 md:px-4 md:pb-2 flex flex-col gap-4 flex-grow overflow-hidden">
            {expandedCardThing.value.type === "monster" && (
              <MonsterCardContent monster={expandedCardThing.value} />
            )}
            {expandedCardThing.value.type === "room" && (
              <RoomCardContent roomContentAndData={expandedCardThing.value} />
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
  return null;
}
