import React, { useEffect } from "react";
import { MapState } from "./useMapState";

export function setHiddenGroups(groups: SVGGElement[], value: boolean) {
  // Check if first label is hidden
  for (const g of groups) {
    if (value) {
      g.setAttribute("hidden", "true");
    } else {
      g.removeAttribute("hidden");
    }
  }
}

export default function useMapControls({
  ...props
}: {
  mapState: MapState;
  labelGroups: React.RefObject<SVGGElement[]>;
}) {
  const { mapState, labelGroups } = props;

  // Hide labels on state change
  useEffect(() => {
    setHiddenGroups(labelGroups.current ?? [], mapState.labelsHidden.value);
  }, [labelGroups, mapState.labelsHidden.value]);
}
