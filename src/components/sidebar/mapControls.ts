export function toggleGroups(groups: SVGGElement[]) {
  // Check if first label is hidden
  const isHidden = groups[0].getAttribute("hidden") === "true";
  for (const g of groups) {
    g.setAttribute("hidden", (!isHidden).toString());
  }
}
