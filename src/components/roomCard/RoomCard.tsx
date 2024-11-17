import { MapState } from "../map/useMapState";
import { Card, CardHeader, CardTitle } from "../ui/card";

export default function RoomCard({ mapState }: { mapState: MapState }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
    </Card>
  );
}
