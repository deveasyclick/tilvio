import { useEffect, RefObject } from 'react';

/**
 * Custom hook to focus an element when a condition is met
 *
 * @param ref - Reference to the element to focus
 * @param shouldFocus - Condition that determines when to focus the element
 * @param options - Additional options
 * @param options.delay - Delay in milliseconds before focusing (useful for animations)
 */
export function useFocusEffect<T extends HTMLElement>(
  ref: RefObject<T | null>,
  shouldFocus: boolean,
  options: { delay?: number } = {},
): void {
  const { delay = 0 } = options;

  useEffect(() => {
    if (shouldFocus && ref.current) {
      const timeoutId = setTimeout(() => {
        ref.current?.focus();
      }, delay);

      return () => clearTimeout(timeoutId);
    }
  }, [ref, shouldFocus, delay]);
}

export default useFocusEffect;
