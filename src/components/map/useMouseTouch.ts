import { useCallback, useRef, useState } from "react";
import { MapState } from "./useMapState";
import mapConfig from "@/lib/map/mapConfig";

export default function useMouseTouch({ mapState }: { mapState: MapState }) {
  const { set: setMapPos } = mapState.mapPos;
  const dragEnabled = mapState.drag.enabledRef;
  const [isDragging, setIsDragging] = useState(false);
  const dragLocked = mapState.drag.lock.value;
  const dragStart = useRef({ x: 0, y: 0 });
  const mouseMoved = useRef(false);
  const lastTouchTime = useRef(0);
  const isDoubleTouchHold = useRef(false);
  const { set: setCellSize } = mapState.currentCellSize;
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

      const deltaX = -(pointX - dragStart.current.x) * dragDeltaMod;
      const deltaY = -(pointY - dragStart.current.y) * dragDeltaMod;

      setMapPos((prevPos) => ({
        x: prevPos.x + deltaX,
        y: prevPos.y + deltaY,
      }));

      // Update dragStart for the next frame
      dragStart.current = { x: pointX, y: pointY };
    },
    [dragDeltaMod, isDragging, setMapPos]
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

  const handleDoubleClick = useCallback(() => {
    setCellSize((prev) => {
      // Set to next pre determined scale level
      const defaultScaleBreakpoints = [
        minCellSize,
        maxCellSize / 2,
        maxCellSize,
      ];

      // Find the next breakpoint
      const nextBreakpoint = defaultScaleBreakpoints.find((breakpoint) => {
        return breakpoint > prev;
      });
      if (nextBreakpoint) return nextBreakpoint;
      return defaultScaleBreakpoints[0];
    });
  }, [maxCellSize, minCellSize, setCellSize]);

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
      // Transform origin at cursor?
      // Scrolling up
      if (e.deltaY < 0) {
        // Increase scale
        setCellSize((prev) => {
          if (prev + cellSizeIncrement <= maxCellSize) {
            return prev + cellSizeIncrement;
          }
          return maxCellSize;
        });
      }
      // Scrolling down
      else {
        // Decrease scale
        setCellSize((prev) => {
          if (prev - cellSizeIncrement > minCellSize) {
            return prev - cellSizeIncrement;
          }
          return minCellSize;
        });
      }
    },
    [cellSizeIncrement, maxCellSize, minCellSize, setCellSize]
  );

  // Context handler
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp: handleDragEnd,
    handleDoubleClick,
    handleContextMenu,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd: handleDragEnd,
    handleWheel,
  };
}
