import { Monster, Thing } from "@/lib/types";
import React, { SetStateAction } from "react";

export default function MonsterLink({
  ...props
}: {
  text: string;
  monster: Monster | null;
  setExpandedCardThing: React.Dispatch<SetStateAction<Thing | null>>;
}) {
  const { text, monster, setExpandedCardThing } = props;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedCardThing(monster ? { type: "monster", ...monster } : null);
  };

  return (
    <a
      className="underline text-sidebar-accent"
      onClick={handleClick}
      href={`/${monster?.name ?? ""}`}
    >
      {text}
    </a>
  );
}
