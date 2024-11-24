const mapConfig = {
  defaultCellSize: 20,
  maxCellSize: 30,
  minCellSize: 5,
  cellSizeIncrement: 5,
  dragDeltaMod: 0.1,
  doubleTouchThreshold: 300,
  bgColor: "#2a2b2a",
  defaultColor: "#c5b57b",
  defaultRoomFill: "#c5b57b",
  labelPadding: 0.32,
  labelMaxLineWidth: 4,
  labelLineHeight: 0.8,
} as const;

export type MapConfig = typeof mapConfig;

export default mapConfig;
