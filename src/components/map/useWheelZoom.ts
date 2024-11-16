import { useCallback, useState } from "react";

export default function useWheelZoom() {
  const scaleIncrement = 15;
  const minScale = 10;
  const maxScale = 200;
  const [scale, setScale] = useState(100);

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

  return {
    handleWheel,
    zoomScale: scale / 100,
  };
}
