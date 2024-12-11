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
      {isExpanded && (
        <div className="border-sidebar-border border rounded-md p-2 -mx-2 flex-grow overflow-y-auto overflow-x-hidden">
          <div className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr] gap-x-2 text-sm border-b-2 border-sidebar-border">
            <p>Variant:</p> <p>Health</p> <p>XP</p> <p>Lvl</p> <p>🔒 Lvl</p>
          </div>
          <div className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr] gap-x-2 text-sm">
            {monster.variants.map((variant) => (
              <>
                <p>{variant.name}</p>
                <p>{variant.health}</p> <p>{variant.experience}</p>{" "}
                <p>{variant.skillLevel}</p>
                <p>{variant.skillLevel}</p>
              </>
            ))}
            {monster.variants.map((variant) => (
              <>
                <p>{variant.name}</p>
                <p>{variant.health}</p> <p>{variant.experience}</p>{" "}
                <p>{variant.skillLevel}</p>
                <p>{variant.skillLevel}</p>
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
