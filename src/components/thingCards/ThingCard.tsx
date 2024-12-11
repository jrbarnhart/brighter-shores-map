import { Thing } from "@/lib/types";
import { Card, CardContent, CardHeader } from "../ui/card";
import { MapState } from "../map/useMapState";
import useThingCardContext from "./useThingCardContext";

export default function ThingCard({
  thing,
  mapState,
  headerNodes,
  contentNodes,
}: {
  thing: Thing;
  mapState: MapState;
  headerNodes: React.ReactNode;
  contentNodes: React.ReactNode;
}) {
  const { search } = mapState;
  const { expandedCardId, setExpandedCardId } = useThingCardContext();

  const handleClick = () => {
    setExpandedCardId((prev) => {
      // Probably should be a unique id of some kind but for now all thing names are unique so it works.
      if (prev === thing.name) {
        search.resultsOpen.set(true);
        return null;
      }
      search.resultsOpen.set(false);
      return thing.name;
    });
  };

  return (
    <div
      className={
        expandedCardId === thing.name
          ? "w-full h-full fixed top-0 left-0 flex items-center justify-center touch-none bg-black/80 backdrop-blur-sm"
          : ""
      }
    >
      <Card
        onClick={handleClick}
        className={`${
          expandedCardId === thing.name
            ? "w-screen max-w-[640px] h-screen max-h-[360px] m-5 scale-105"
            : "scale-100"
        } bg-sidebar border-sidebar-border text-sidebar-foreground transition-transform ease-in`}
      >
        <CardHeader className="px-3 py-2 md:p-6">{headerNodes}</CardHeader>
        <CardContent className="px-3 pb-1 md:px-6 md:pb-3">
          {contentNodes}
        </CardContent>
      </Card>
    </div>
  );
}
