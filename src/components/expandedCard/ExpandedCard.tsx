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
import { Monster, ResourceNode, RoomContentAndData } from "@/lib/types";
import { Fisher, Forager, Guard, Passive } from "../gameIcons/gameIcons";
import { getDamageIcon } from "../gameIcons/gameIconUtils";
import RoomLink from "../roomLink/RoomLink";
import { findMonsterByBaseName, findRoomById } from "@/lib/map/mapDataUtils";
import MonsterLink from "../monsterLink/MonsterLink";
import ResourceLink from "../resourceLink/ResourceLink";

const ResourceCardContent = ({ resource }: { resource: ResourceNode }) => {
  return (
    <>
      <div className="h-10 flex items-center gap-1 md:gap-3 text-sm max-w-md"></div>

      <div className="border-sidebar-border border rounded-md p-2 -mx-2 flex-grow overflow-y-auto overflow-x-hidden">
        <div className="grid grid-cols-[3fr_1fr] gap-x-2 border-b-2 border-sidebar-border">
          <p>Variant:</p>
          <p className="text-nowrap">🔒 Lvl</p>
        </div>
        <ul className="">
          {resource.variants.map((variant) => (
            <li
              key={variant.variantName}
              className="list-none grid grid-cols-[3fr_1fr] gap-x-2 text-sm odd:bg-black/30 even:bg-black/10 py-1"
            >
              <p>
                {variant.variantName[0].toUpperCase() +
                  variant.variantName.slice(1)}
              </p>
              <p>{variant.unlockLevel}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ResourceCardHeader = ({
  resource,
  mapState,
}: {
  resource: ResourceNode;
  mapState: MapState;
}) => {
  const { selectedRoomId } = mapState;
  return (
    <>
      <CardTitle className="flex flex-nowrap justify-between items-start">
        <p className="text-nowrap overflow-hidden leading-8">
          {resource.baseName[0].toUpperCase() + resource.baseName.slice(1)}
        </p>
      </CardTitle>
      <CardDescription className="flex flex-col">
        <p className="text-sidebar-foreground">Locations:</p>
        <div>
          {resource.locations.map((location, index) => {
            const room = findRoomById(mapState.roomPaths.value, location);
            return (
              <React.Fragment key={index}>
                <RoomLink
                  text={room ? room.label : location}
                  roomId={location}
                  setSelectedRoomId={selectedRoomId.set}
                />
                {resource.locations.length - 1 > index ? ", " : ""}
              </React.Fragment>
            );
          })}
        </div>
      </CardDescription>
    </>
  );
};

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
  mapState,
}: {
  roomContentAndData: RoomContentAndData;
  mapState: MapState;
}) => {
  return (
    <>
      {roomContentAndData.content.monsters &&
        roomContentAndData.content.monsters.map((monster) => {
          const monsterSearch = findMonsterByBaseName(monster);
          return (
            <div
              key={monster}
              className="h-10 flex items-center gap-1 md:gap-3"
            >
              {monsterSearch.region === "hopeport" ? <Guard /> : null}
              <MonsterLink
                key={monster}
                text={monster[0].toUpperCase() + monster.slice(1)}
                monster={monsterSearch.result}
                setExpandedCardThing={mapState.expandedCardThing.set}
              />
            </div>
          );
        })}
      {roomContentAndData.content.resources &&
        roomContentAndData.content.resources.map((resource) => {
          return (
            <div
              key={resource.baseName}
              className="h-10 flex items-center gap-1 md:gap-3"
            >
              {resource.nodeType === "fisher" ? (
                <Fisher />
              ) : // Disabled this rule b/c new nodeTypes could be added
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
              resource.nodeType === "forager" ? (
                <Forager />
              ) : null}
              <ResourceLink
                resource={resource}
                setExpandedCardThing={mapState.expandedCardThing.set}
                text={resource.baseName}
              />
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
        <ul className="">
          {monster.variants.map((variant) => (
            <li
              key={variant.name}
              className="list-none grid grid-cols-[3fr_1fr_1fr] gap-x-2 text-sm odd:bg-black/30 even:bg-black/10 py-1"
            >
              <p>{variant.name[0].toUpperCase() + variant.name.slice(1)}</p>
              <p>{variant.monsterLevel}</p>
              <p>{variant.unlockLevel}</p>
            </li>
          ))}
        </ul>
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
        className={`w-full h-full fixed top-0 left-0 flex items-center justify-center touch-none ${
          expandedCardThing.value.type === "monster"
            ? "bg-black/80 backdrop-blur-sm"
            : "bg-black/40"
        }`}
      >
        <Card
          onClick={handleCardClick}
          className={`w-screen h-screen m-5 scale-105 bg-sidebar border-sidebar-border text-sidebar-foreground transition-transform ease-in flex flex-col ${
            expandedCardThing.value.type === "monster"
              ? "max-w-2xl max-h-[360px]"
              : expandedCardThing.value.type === "room"
              ? "max-w-xl max-h-52 md:max-h-64 self-end"
              : "max-w-2xl max-h-[360px]"
          }`}
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
            {expandedCardThing.value.type === "resource" && (
              <ResourceCardHeader
                resource={expandedCardThing.value}
                mapState={mapState}
              />
            )}
          </CardHeader>
          <CardContent className="px-3 pb-1 md:px-4 md:pb-2 flex flex-col gap-4 flex-grow overflow-hidden">
            {expandedCardThing.value.type === "monster" && (
              <MonsterCardContent monster={expandedCardThing.value} />
            )}
            {expandedCardThing.value.type === "room" && (
              <RoomCardContent
                roomContentAndData={expandedCardThing.value}
                mapState={mapState}
              />
            )}
            {expandedCardThing.value.type === "resource" && (
              <ResourceCardContent resource={expandedCardThing.value} />
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
  return null;
}
