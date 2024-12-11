import { Monster } from "@/lib/types";
import { Impact, Necromae, Tempestae } from "../../gameIcons/gameIcons";

export default function MonsterCard({ monster }: { monster: Monster }) {
  return (
    <div className="h-10 flex items-center justify-between gap-1 text-sm">
      <p>Attack: </p>
      <Impact />
      <p>Immune: </p>
      <Tempestae />
      <p>Weak: </p>
      <Necromae />
    </div>
  );
}
