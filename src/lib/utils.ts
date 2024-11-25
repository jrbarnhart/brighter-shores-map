import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { NormalizedValue, PixelValue } from "./generalTypes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toPixels(value: NormalizedValue, cellSize: number): PixelValue {
  return value * cellSize;
}
