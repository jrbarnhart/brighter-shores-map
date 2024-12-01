import { PixelValue } from "../types";

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
  labelPadding: 8 as PixelValue,
  labelMaxLineWidth: 96 as PixelValue,
  labelLineHeight: 16 as PixelValue,
  labelColor: "lightblue",
  labelTextColor: "black",
  labelTextSize: 16 as PixelValue,
  labelBorderColor: "black",
} as const;

export type MapConfig = typeof mapConfig;

export default mapConfig;
