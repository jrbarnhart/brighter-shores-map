import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function debounce(func: (...args: unknown[]) => void, timeout = 300) {
  let timer: ReturnType<typeof setTimeout>;

  const debouncedFn = (...args: unknown[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };

  debouncedFn.cancel = () => {
    clearTimeout(timer);
  };

  return debouncedFn;
}
