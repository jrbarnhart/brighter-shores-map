import { ThingCardContextType } from "@/lib/types";
import { createContext } from "react";

export const ThingCardContext = createContext<ThingCardContextType>({
  expandedCardId: null,
  setExpandedCardId: () => {},
});
