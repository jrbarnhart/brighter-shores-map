import React, { SetStateAction, useCallback, useRef, useState } from "react";
import { MapState } from "./useMapState";
import mapConfig from "@/lib/map/mapConfig";
import { NormalizedValue, RoomDataWithPath, RoomId } from "@/lib/types";
import { adjustMapPosOnZoom, toPixels } from "@/lib/utils";

export default function useMouseTouch({ mapState }: { mapState: MapState }) {
  const canvasSize = mapState.canvas.size.value;
  const { set: setMapPos } = mapState.mapPos;
  const dragEnabled = mapState.drag.enabledRef;
  const [isDragging, setIsDragging] = useState(false);
  const dragLocked = mapState.drag.lock.value;
  const dragStart = useRef({ x: 0, y: 0 });
  const mouseMoved = useRef(false);
  const lastTouchTime = useRef(0);
  const isDoubleTouchHold = useRef(false);
  const { value: currentCellSize, set: setCurrentCellSize } =
    mapState.currentCellSize;
  const {
    minCellSize,
    maxCellSize,
    cellSizeIncrement,
    dragDeltaMod,
    doubleTouchThreshold,
  } = mapConfig;

  // General handlers for panning
  const handleDragStart = useCallback((pointX: number, pointY: number) => {
    setIsDragging(true);
    dragStart.current = {
      x: pointX,
      y: pointY,
    };
    mouseMoved.current = false;
  }, []);

  const handleDragMove = useCallback(
    (pointX: number, pointY: number) => {
      if (!isDragging) return;
      mouseMoved.current = true;

      // Mods the drag amount in a way that keeps it consistent between all cell sizes
      // Smaller cell sizes should be > 1, the middle cell size should = 1, and larger cell sizes should be < 1
      const midpoint = (minCellSize + maxCellSize) / 2;
      const cellSizeMod = midpoint / currentCellSize;

      const deltaX =
        -(pointX - dragStart.current.x) * dragDeltaMod * cellSizeMod;
      const deltaY =
        -(pointY - dragStart.current.y) * dragDeltaMod * cellSizeMod;

      setMapPos((prevPos) => ({
        x: prevPos.x + deltaX,
        y: prevPos.y + deltaY,
      }));

      // Update dragStart for the next frame
      dragStart.current = { x: pointX, y: pointY };
    },
    [
      currentCellSize,
      dragDeltaMod,
      isDragging,
      maxCellSize,
      minCellSize,
      setMapPos,
    ]
  );

  const handleDragEnd = useCallback(() => {
    dragEnabled.current = false;
    isDoubleTouchHold.current = false;
    setIsDragging(false);
  }, [dragEnabled]);

  // Mouse handlers
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.buttons === 2 || dragLocked) {
        dragEnabled.current = true;
      }
      if (dragEnabled.current) {
        handleDragStart(e.clientX, e.clientY);
      }
    },
    [dragEnabled, dragLocked, handleDragStart]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      handleDragMove(e.clientX, e.clientY);
    },
    [handleDragMove]
  );

  const handleClick = useCallback(
    ({
      e,
      visibleRooms,
      canvasCtx,
      mapPos,
      currentCellSize,
      setSelectedId,
      setDetailsOpen,
    }: {
      e: React.MouseEvent;
      visibleRooms: RoomDataWithPath[];
      canvasCtx: CanvasRenderingContext2D | null | undefined;
      mapPos: { x: NormalizedValue; y: NormalizedValue };
      currentCellSize: number;
      setSelectedId: React.Dispatch<SetStateAction<RoomId | null>>;
      setDetailsOpen: React.Dispatch<SetStateAction<boolean>>;
    }) => {
      if (!canvasCtx) return;

      const x = e.clientX + toPixels(mapPos.x, currentCellSize);
      const y = e.clientY + toPixels(mapPos.y, currentCellSize);

      for (const room of visibleRooms) {
        if (canvasCtx.isPointInPath(room.element, x, y)) {
          setSelectedId(room.id);
          setDetailsOpen(true);
          return;
        }
      }

      setDetailsOpen(false);
      setSelectedId(null);
    },
    []
  );

  const handleDoubleClick = useCallback(() => {
    // Set to next pre determined cell size
    const defaultSizeBreakpoints = [minCellSize, maxCellSize / 2, maxCellSize];

    // Find the next breakpoint
    const nextBreakpoint =
      defaultSizeBreakpoints.find((breakpoint) => {
        return breakpoint > currentCellSize;
      }) ?? defaultSizeBreakpoints[0];

    // Adjust mapPos
    adjustMapPosOnZoom(setMapPos, canvasSize, currentCellSize, nextBreakpoint);
    setCurrentCellSize(nextBreakpoint);
  }, [
    canvasSize,
    currentCellSize,
    maxCellSize,
    minCellSize,
    setCurrentCellSize,
    setMapPos,
  ]);

  // Touch handlers
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const now = new Date().getTime();
      if (now - lastTouchTime.current < doubleTouchThreshold) {
        isDoubleTouchHold.current = true;
      }
      lastTouchTime.current = now;
      if (e.touches.length > 1 || isDoubleTouchHold.current) {
        dragEnabled.current = true;
      }
      if (dragEnabled.current || dragLocked) {
        const touch = e.touches[0];
        handleDragStart(touch.clientX, touch.clientY);
      }
    },
    [doubleTouchThreshold, dragEnabled, dragLocked, handleDragStart]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      handleDragMove(touch.clientX, touch.clientY);

      if (isDragging) {
        e.preventDefault();
      }
    },
    [handleDragMove, isDragging]
  );

  // Wheel zoom handler
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      // Calculate new cell size
      const change = cellSizeIncrement * (e.deltaY < 0 ? 1 : -1);
      const testCellSize = Math.min(
        maxCellSize,
        Math.max(minCellSize, currentCellSize + change)
      );

      if (testCellSize !== currentCellSize) {
        adjustMapPosOnZoom(
          setMapPos,
          canvasSize,
          currentCellSize,
          testCellSize
        );
        setCurrentCellSize(testCellSize);
      }
    },
    [
      canvasSize,
      cellSizeIncrement,
      currentCellSize,
      maxCellSize,
      minCellSize,
      setCurrentCellSize,
      setMapPos,
    ]
  );

  // Context handler
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp: handleDragEnd,
    handleClick,
    handleDoubleClick,
    handleContextMenu,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd: handleDragEnd,
    handleWheel,
  };
}
