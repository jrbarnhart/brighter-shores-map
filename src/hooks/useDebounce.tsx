import { useCallback, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useDebounce<T extends (...args: any[]) => void>(
  callback: T,
  delay = 300
) {
  // Use useRef to persist the timer between renders
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  // Use useRef to always have access to the latest callback
  const callbackRef = useRef(callback);

  // Update the callback ref whenever the callback changes
  callbackRef.current = callback;

  // Use useCallback to memoize the debounced function
  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  ); // Only recreate if delay changes

  // Cleanup function to cancel any pending debounced calls
  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  return Object.assign(debouncedFn, { cancel });
}

export default useDebounce;
