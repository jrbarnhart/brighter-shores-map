import { SetStateAction } from "react";
import { Button } from "../ui/button";
import { Move } from "lucide-react";

export default function MoveButton({
  dragLocked,
  setDragLocked,
}: {
  dragLocked: boolean;
  setDragLocked: React.Dispatch<SetStateAction<boolean>>;
}) {
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
