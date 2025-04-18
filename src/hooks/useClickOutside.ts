import { useEffect, RefObject } from 'react';

/**
 * Custom hook to detect clicks outside of specified elements
 *
 * @param refs - Reference or array of references to elements to detect clicks outside of
 * @param callback - Function to call when a click outside is detected
 * @param enabled - Whether the hook should be active (defaults to true)
 */
const useClickOutside = <T extends HTMLElement = HTMLElement>(
  refs: RefObject<T | null> | RefObject<T | null>[],
  callback: () => void,
  enabled: boolean = true,
): void => {
  useEffect(() => {
    if (!enabled) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Convert single ref to array for consistent handling
      const refsArray = Array.isArray(refs) ? refs : [refs];

      // Check if the click was outside all of the provided refs
      const isOutside = refsArray.every(
        (ref) => !ref.current || !ref.current.contains(target),
      );

      if (isOutside) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [refs, callback, enabled]);
};

export default useClickOutside;
