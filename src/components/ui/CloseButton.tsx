import React, { SetStateAction } from "react";
import { Button } from "./button";
import { X } from "lucide-react";

export default function CloseButton({
  ...props
}: {
  setOpenState: React.Dispatch<SetStateAction<boolean>>;
}) {
  const { setOpenState } = props;
  // Always close on escape key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "escape") {
      setOpenState(false);
    }
  };

  const handleClick = () => {
    setOpenState(false);
  };
  return (
    <Button
      className="h-8 w-4 bg-red-400 text-black hover:text-white"
      onKeyDown={handleKeyDown}
      onClick={handleClick}
    >
      <X />
    </Button>
  );
}
