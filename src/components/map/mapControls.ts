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
