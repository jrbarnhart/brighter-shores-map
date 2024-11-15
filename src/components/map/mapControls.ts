export function setHiddenGroups(groups: SVGGElement[], value: boolean) {
  // Check if first label is hidden
  for (const g of groups) {
    g.setAttribute("hidden", value.toString());
  }
}
