import { useCallback, useRef, useState } from "react";

export default function useMouseTouch({
  dragEnabled,
}: {
  dragEnabled: React.MutableRefObject<boolean>;
}) {
  // Panning
  const [mapPos, setMapPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const mouseMoved = useRef(false);
  // Zooming
  const [isPinching, setIsPinching] = useState(false);
  const pinchInitialDistance = useRef(0);
  const scaleIncrement = 15;
  const minScale = 10;
  const maxScale = 200;
  const [scale, setScale] = useState(100);

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
    [isDragging]
  );

  const handleDragEnd = useCallback(() => {
    dragEnabled.current = false;
    setIsDragging(false);
  }, [dragEnabled]);

  // Mouse handlers
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      handleDragStart(e.clientX, e.clientY);
    },
    [handleDragStart]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      handleDragMove(e.clientX, e.clientY);
    },
    [handleDragMove]
  );

  // Touch handlers
  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      handleDragStart(touch.clientX, touch.clientY);
    },
    [handleDragStart]
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
  const handleWheel = useCallback((e: React.WheelEvent) => {
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
  }, []);

  // Context handler
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    if (mouseMoved.current) {
      e.preventDefault();
    }
  }, []);

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp: handleDragEnd,
    handleContextMenu,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd: handleDragEnd,
    handleWheel,
    zoomScale: scale / 100,
    mapPos,
    isDragging,
  };
}
