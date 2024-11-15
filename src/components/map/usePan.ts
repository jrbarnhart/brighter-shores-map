import { useCallback, useRef, useState } from "react";

export default function usePan({
  dragEnabled,
}: {
  dragEnabled: React.MutableRefObject<boolean>;
}) {
  const [mapPos, setMapPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const mouseMoved = useRef(false);

  const handleMouseDownPan = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      dragStart.current = {
        x: e.clientX - mapPos.x,
        y: e.clientY - mapPos.y,
      };
      mouseMoved.current = false;
    },
    [mapPos]
  );

  const handleMouseMovePan = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;

      mouseMoved.current = true;

      const newX = e.clientX - dragStart.current.x;
      const newY = e.clientY - dragStart.current.y;

      // Add bounds checking here if needed
      setMapPos({ x: newX, y: newY });
    },
    [isDragging]
  );

  const handleMouseUpPan = useCallback(() => {
    dragEnabled.current = false;
    setIsDragging(false);
  }, [dragEnabled]);

  const handleContextMenuPan = useCallback((e: React.MouseEvent) => {
    if (mouseMoved.current) {
      e.preventDefault();
    }
  }, []);

  return {
    handleMouseDownPan,
    handleMouseMovePan,
    handleMouseUpPan,
    handleContextMenuPan,
    mapPos,
    isDragging,
  };
}
