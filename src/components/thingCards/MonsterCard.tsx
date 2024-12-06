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

export default function MonsterCard({
  ...props
}: {
  monster: Monster;
  mapState: MapState;
}) {
  const { monster, mapState } = props;
  const { selectedRoomId } = mapState;
  return (
    <Card className="bg-sidebar border-sidebar-border text-sidebar-foreground">
      <CardHeader className="p-3">
        <CardTitle>
          {monster.name[0].toUpperCase() + monster.name.slice(1)}
        </CardTitle>
        <CardDescription>
          {monster.locations.map((location, index) => {
            const room = findRoomById(mapState.roomPaths.value, location);
            return (
              <>
                <RoomLink
                  key={index}
                  text={room ? room.label : location}
                  roomId={location}
                  setSelectedRoomId={selectedRoomId.set}
                />
                {monster.locations.length - 1 > index ? ", " : ""}
              </>
            );
          })}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        Attacks: , Immune: , Vulnerable:
      </CardContent>
    </Card>
  );
}
