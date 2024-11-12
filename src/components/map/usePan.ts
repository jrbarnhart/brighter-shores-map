import { useCallback, useRef, useState } from "react";

export default function usePan() {
  const [mapPos, setMapPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      dragStart.current = {
        x: e.clientX - mapPos.x,
        y: e.clientY - mapPos.y,
      };
    },
    [mapPos]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - dragStart.current.x;
      const newY = e.clientY - dragStart.current.y;

      // Add bounds checking here if needed
      setMapPos({ x: newX, y: newY });
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    mapPos,
    isDragging,
  };
}
