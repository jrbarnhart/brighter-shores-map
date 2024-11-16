import { Button } from "../ui/button";
import { Move } from "lucide-react";
import { MapState } from "../map/useMapState";

export default function MoveButton({ mapState }: { mapState: MapState }) {
  const { value: dragLocked, set: setDragLocked } = mapState.drag.lock;
  const handleClick = () => {
    setDragLocked((prev) => !prev);
  };

  return (
    <Button
      onClick={handleClick}
      className={
        "absolute top-0 right-0 z-10 m-3 h-12 w-12 border border-sidebar-accent hover:bg-sidebar-accent hover:text-foreground " +
        (dragLocked
          ? "bg-sidebar-accent text-foreground"
          : "bg-sidebar text-sidebar-foreground")
      }
    >
      <Move />
    </Button>
  );
}
