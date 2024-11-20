import { useCallback, useEffect, useRef } from "react";

export default function useAnimationFrame(
  callback: (deltaTime?: number) => void
) {
  const requestRef = useRef<number | undefined>();
  const previousTimeRef = useRef<number | undefined>();

  const animate = useCallback(
    (time: number) => {
      if (previousTimeRef.current != undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    },
    [callback]
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);
}
