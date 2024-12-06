import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  MapData,
  NormalizedValue,
  PixelValue,
  RoomDataWithPath,
  RoomId,
  Size,
} from "./types";
import { SetStateAction } from "react";

// Tailwind class merging
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Functions to convert between pixel space and normalized grid space
export function toPixels(value: NormalizedValue, cellSize: number): PixelValue {
  return value * cellSize;
}
export function toNormalizedGridSpace(
  value: PixelValue,
  cellSize: number
): NormalizedValue {
  return Math.round(value / cellSize);
}

// Used by various control interfaces to zoom the map
export function adjustMapPosOnZoom(
  setMapPos: React.Dispatch<
    SetStateAction<{ x: NormalizedValue; y: NormalizedValue }>
  >,
  canvasSize: Size,
  currentCellSize: number,
  newCellSize: number
) {
  setMapPos((prev) => {
    // Canvas center point
    const centerX = canvasSize.width / 2;
    const centerY = canvasSize.height / 2;

    // Convert screen center to current grid coordinates
    const currentNormX = toNormalizedGridSpace(centerX, currentCellSize);
    const currentNormY = toNormalizedGridSpace(centerY, currentCellSize);

    // Convert screen center to new grid coordinates
    const newNormX = toNormalizedGridSpace(centerX, newCellSize);
    const newNormY = toNormalizedGridSpace(centerY, newCellSize);

    // Calculate the adjustment needed to keep the center point
    const newX = prev.x + (currentNormX - newNormX);
    const newY = prev.y + (currentNormY - newNormY);

    return { x: newX, y: newY };
  });
}

// Find the room data by a given room id
export function findRoomById(rooms: RoomDataWithPath[], roomId: RoomId) {
  return rooms.find((room) => room.id === roomId);
}
