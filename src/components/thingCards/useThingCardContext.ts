import { useContext } from "react";
import { ThingCardContext } from "./ThingCardContext";

export default function useThingCardContext() {
  const context = useContext(ThingCardContext);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!context) {
    throw new Error(
      "useThingCardContext must be used within a ThingCardProvider"
    );
  }

  return context;
}
