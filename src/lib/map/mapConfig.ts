import { NormalizedValue, PixelValue } from "../generalTypes";

const mapConfig = {
  defaultCellSize: 20 as PixelValue,
  maxCellSize: 30 as PixelValue,
  minCellSize: 5 as PixelValue,
  cellSizeIncrement: 5,
  dragDeltaMod: 0.1,
  doubleTouchThreshold: 300,
  bgColor: "#2a2b2a",
  defaultColor: "#c5b57b",
  defaultRoomFill: "#c5b57b",
  labelPadding: 2 as NormalizedValue,
  labelMaxLineWidth: 4 as NormalizedValue,
  labelLineHeight: 0.8 as NormalizedValue,
  labelColor: "lightblue",
  labelTextColor: "black",
  labelBorderColor: "black",
} as const;

export type MapConfig = typeof mapConfig;

export default mapConfig;
