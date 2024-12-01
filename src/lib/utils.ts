import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { NormalizedValue, PixelValue } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toPixels(value: NormalizedValue, cellSize: number): PixelValue {
  return value * cellSize;
}

export function toNormalizedGridSpace(
  value: PixelValue,
  cellSize: number
): NormalizedValue {
  return Math.round(value / cellSize);
}
