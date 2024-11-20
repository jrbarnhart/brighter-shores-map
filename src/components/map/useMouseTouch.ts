import { useCallback, useRef, useState } from "react";
import { MapState } from "./useMapState";
import mapConfig from "@/lib/map/mapConfig";

export default function useMouseTouch({
  dragEnabled,
  mapState,
}: {
  dragEnabled: React.MutableRefObject<boolean>;
  mapState: MapState;
}) {
  const { value: mapPos, set: setMapPos } = mapState.mapPos;
  const [isDragging, setIsDragging] = useState(false);
  const dragLocked = mapState.drag.lock.value;
  const dragStart = useRef({ x: 0, y: 0 });
  const mouseMoved = useRef(false);
  const lastTouchTime = useRef(0);
  const isDoubleTouchHold = useRef(false);
  const { set: setScale } = mapState.scale;
  const { scaleIncrement, minScale, maxScale, doubleTouchThreshold } =
    mapConfig;

  // General handlers for panning
  const handleDragStart = useCallback(
    (pointX: number, pointY: number) => {
      setIsDragging(true);
      dragStart.current = {
        x: pointX - mapPos.x,
        y: pointY - mapPos.y,
      };
      mouseMoved.current = false;
    },
    [mapPos]
  );

  const handleDragMove = useCallback(
    (pointX: number, pointY: number) => {
      if (!isDragging) return;
      mouseMoved.current = true;
      const newX = pointX - dragStart.current.x;
      const newY = pointY - dragStart.current.y;
      setMapPos({ x: newX, y: newY });
    },
    [isDragging, setMapPos]
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
    setScale((prev) => {
      // Set to next pre determined scale level
      const defaultScaleBreakpoints = [minScale, maxScale / 2, maxScale];

      // Find the next breakpoint
      const nextBreakpoint = defaultScaleBreakpoints.find((breakpoint) => {
        return breakpoint > prev;
      });
      if (nextBreakpoint) return nextBreakpoint;
      return defaultScaleBreakpoints[0];
    });
  }, [maxScale, minScale, setScale]);

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
        setScale((prev) => {
          if (prev + scaleIncrement <= maxScale) {
            return prev + scaleIncrement;
          }
          return maxScale;
        });
      }
      // Scrolling down
      else {
        // Decrease scale
        setScale((prev) => {
          if (prev - scaleIncrement > minScale) {
            return prev - scaleIncrement;
          }
          return minScale;
        });
      }
    },
    [maxScale, minScale, scaleIncrement, setScale]
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
