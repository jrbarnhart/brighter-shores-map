import { SetStateAction } from "react";
import { Button } from "../ui/button";
import { Move } from "lucide-react";

export default function MoveButton({
  dragEnabled,
  setDragEnabled,
}: {
  dragEnabled: boolean;
  setDragEnabled: React.Dispatch<SetStateAction<boolean>>;
}) {
  const handleClick = () => {
    setDragEnabled((prev) => !prev);
  };

  return (
    <Button
      onClick={handleClick}
      className={
        "absolute top-0 right-0 z-10 m-3 h-11 w-11 border border-sidebar-accent hover:bg-sidebar-accent hover:text-foreground " +
        (dragEnabled
          ? "bg-sidebar-accent text-foreground"
          : "bg-sidebar text-sidebar-foreground")
      }
    >
      <Move />
    </Button>
  );
}
