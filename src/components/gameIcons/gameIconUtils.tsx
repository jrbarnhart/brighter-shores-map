import { DamageType } from "@/lib/types";
import {
  Arborae,
  Cryonae,
  Impact,
  Infernae,
  Necromae,
  Tempestae,
} from "src/components/gameIcons/gameIcons";

// Util for getting an icon based on a passed damage type
export function getDamageIcon(damageType: DamageType) {
  switch (damageType) {
    case "impact":
      return <Impact />;
    case "arborae":
      return <Arborae />;
    case "cryonae":
      return <Cryonae />;
    case "infernae":
      return <Infernae />;
    case "necromae":
      return <Necromae />;
    case "tempestae":
      return <Tempestae />;
    default:
      return null;
  }
}
