import { useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { MapState } from "../map/useMapState";
import {
  Monster,
  ResourceNode,
  RoomContentAndRoomData,
  Thing,
} from "@/lib/types";
import React from "react";
import RoomLink from "../roomLink/RoomLink";
import { Fisher, Forager, Guard, Passive } from "../gameIcons/gameIcons";
import { getDamageIcon } from "../gameIcons/gameIconUtils";
import { findRoomById } from "@/lib/map/mapDataUtils";
import { Fish } from "lucide-react";

const RoomCardHeader = ({ room }: { room: RoomContentAndRoomData }) => {
  return (
    <>
      <CardTitle className="flex flex-nowrap items-center gap-3 h-8">
        <p className="text-nowrap overflow-hidden leading-8">
          {room.data.label}
        </p>
      </CardTitle>
      <CardDescription className="flex flex-col">
        <div></div>
      </CardDescription>
    </>
  );
};

const RoomCardContents = ({ room }: { room: RoomContentAndRoomData }) => {
  return (
    <div className="h-8">
      {room.content.monsters && <Guard />}
      {room.content.resources &&
        room.content.resources.find(
          (resource) => resource.nodeType === "fisher"
        ) && <Fish />}
      {room.content.resources &&
        room.content.resources.find(
          (resource) => resource.nodeType === "forager"
        ) && <Forager />}
    </div>
  );
};

const ResourceCardHeader = ({
  mapState,
  resource,
}: {
  mapState: MapState;
  resource: ResourceNode;
}) => {
  return (
    <>
      <CardTitle className="flex flex-nowrap items-center gap-3 h-8">
        {resource.nodeType === "fisher" && <Fisher />}
        <p className="text-nowrap overflow-hidden leading-8">
          {resource.baseName[0].toUpperCase() + resource.baseName.slice(1)}
        </p>
      </CardTitle>
      <CardDescription className="flex flex-col">
        <div>
          {resource.locations.map((location, index) => {
            const room = findRoomById(mapState.roomPaths.value, location);
            return (
              <React.Fragment key={index}>
                <RoomLink
                  text={room ? room.label : location}
                  roomId={location}
                  mapState={mapState}
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

const ResourceCardContents = ({ resource }: { resource: ResourceNode }) => {
  return (
    <>
      {resource.passive && (
        <div className="h-5 flex items-center gap-1 md:gap-3 text-sm max-w-md">
          <p>Passive</p>
          <Passive />
        </div>
      )}
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
  return (
    <>
      <CardTitle className="flex flex-nowrap items-center gap-3 h-8">
        {/* This icon needs to be conditional based on monsters region.
            This property doesn't exist yet so just using Guard as default for now. */}
        <Guard />
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
                  mapState={mapState}
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
  const setSearchResultsOpen = mapState.search.resultsOpen.set;
  const setSelectedRoomId = mapState.selectedRoomId.set;

  const handleClick = useCallback(() => {
    setExpandedCardThing(thing);
    setSearchResultsOpen(false);
    if (thing.type === "room") {
      setSelectedRoomId(thing.data.id);
    }
  }, [setExpandedCardThing, setSearchResultsOpen, setSelectedRoomId, thing]);

  return (
    <Card
      onClick={handleClick}
      className="bg-sidebar border-sidebar-border text-sidebar-foreground flex flex-col"
    >
      <CardHeader className="px-3 py-2 md:p-4">
        {thing.type === "monster" && (
          <MonsterCardHeader monster={thing} mapState={mapState} />
        )}
        {thing.type === "resource" && (
          <ResourceCardHeader resource={thing} mapState={mapState} />
        )}
        {thing.type === "room" && <RoomCardHeader room={thing} />}
      </CardHeader>
      <CardContent className="px-3 pb-1 md:px-4 md:pb-2 flex flex-col gap-4 flex-grow overflow-hidden">
        {thing.type === "monster" && <MonsterCardContents monster={thing} />}
        {thing.type === "resource" && <ResourceCardContents resource={thing} />}
        {thing.type === "room" && <RoomCardContents room={thing} />}
      </CardContent>
    </Card>
  );
}
