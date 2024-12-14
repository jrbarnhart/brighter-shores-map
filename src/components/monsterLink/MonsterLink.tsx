import { findMonsterByBaseName } from "@/lib/map/mapDataUtils";
import { MonsterBaseName, Thing } from "@/lib/types";
import React, { SetStateAction } from "react";

export default function MonsterLink({
  ...props
}: {
  text: string;
  monsterBaseName: MonsterBaseName;
  setExpandedCardThing: React.Dispatch<SetStateAction<Thing | null>>;
}) {
  const { text, monsterBaseName, setExpandedCardThing } = props;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const monsterSearch = findMonsterByBaseName(monsterBaseName);
    setExpandedCardThing(
      monsterSearch.result ? { type: "monster", ...monsterSearch.result } : null
    );
  };

  return (
    <a
      className="underline text-sidebar-accent"
      onClick={handleClick}
      href={`/${monsterBaseName}`}
    >
      {text}
    </a>
  );
}
