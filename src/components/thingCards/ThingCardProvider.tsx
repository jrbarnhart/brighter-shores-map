import { ThingCardId } from "@/lib/types";
import React, { useState } from "react";
import { ThingCardContext } from "./ThingCardContext";

export function ThingCardProvider({ children }: { children: React.ReactNode }) {
  const [expandedCardId, setExpandedCardId] = useState<ThingCardId | null>(
    null
  );

  return (
    <ThingCardContext.Provider value={{ expandedCardId, setExpandedCardId }}>
      {children}
    </ThingCardContext.Provider>
  );
}
