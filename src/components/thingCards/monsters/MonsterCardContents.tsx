import { Monster } from "@/lib/types";
import useThingCardContext from "../useThingCardContext";
import { getDamageIcon } from "@/components/gameIcons/gameIconUtils";
import React from "react";

export default function MonsterCardContents({ monster }: { monster: Monster }) {
  const { expandedCardId } = useThingCardContext();
  const isExpanded = monster.name === expandedCardId;

  return (
    <>
      <div className="h-10 flex items-center gap-1 md:gap-3 text-sm max-w-md">
        <p>Attack: </p>
        {getDamageIcon(monster.attackDamage)}
        {monster.vulnerableDamage && (
          <>
            <p>Weak:</p>
            {getDamageIcon(monster.vulnerableDamage)}
          </>
        )}
        {monster.immuneDamage && (
          <>
            <p>Immune:</p>
            {getDamageIcon(monster.immuneDamage)}
          </>
        )}
      </div>
      {isExpanded && (
        <div className="border-sidebar-border border rounded-md p-2 -mx-2 flex-grow overflow-y-auto overflow-x-hidden">
          <div className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr] gap-x-2 border-b-2 border-sidebar-border">
            <p>Variant:</p> <p>Health</p> <p>XP</p> <p>Lvl</p> <p>🔒 Lvl</p>
          </div>
          <div className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr] gap-x-2 text-sm">
            {monster.variants.map((variant) => (
              <React.Fragment key={variant.name}>
                <p>{variant.name[0].toUpperCase() + variant.name.slice(1)}</p>
                <p>{variant.health}</p> <p>{variant.experience}</p>{" "}
                <p>{variant.monsterLevel}</p>
                <p>{variant.unlockLevel}</p>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
