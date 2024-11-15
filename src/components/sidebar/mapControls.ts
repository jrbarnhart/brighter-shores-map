export function toggleLabels(labels: SVGGElement[]) {
  // Check if first label is hidden
  const isHidden = labels[0].getAttribute("hidden") === "true";
  for (const label of labels) {
    label.setAttribute("hidden", (!isHidden).toString());
  }
}
