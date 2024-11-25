import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type NormalizedValue = number;
type PixelValue = number;
export function toPixels(value: NormalizedValue, cellSize: number): PixelValue {
  return value * cellSize;
}
