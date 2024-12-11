import { Monster } from "@/lib/types";
import { Impact, Necromae, Tempestae } from "../../gameIcons/gameIcons";
import useThingCardContext from "../useThingCardContext";

export default function MonsterCardContents({ monster }: { monster: Monster }) {
  const { expandedCardId } = useThingCardContext();
  const isExpanded = monster.name === expandedCardId;

  return (
    <>
      <div className="h-12 flex items-center gap-1 md:gap-3 text-sm max-w-md">
        <p>Attack: </p>
        <Impact />
        <p>Immune: </p>
        <Tempestae />
        <p>Weak: </p>
        <Necromae />
      </div>
      {isExpanded && <div>Expanded!</div>}
    </>
  );
}
