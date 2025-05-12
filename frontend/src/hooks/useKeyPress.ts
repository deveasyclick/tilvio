import { useEffect, useCallback, useMemo } from 'react';

type KeyHandler = (event: KeyboardEvent) => void;

/**
 * Custom hook to handle keyboard events
 *
 * @param key - The key to listen for (e.g., 'Escape', 'Enter')
 * @param handler - The callback function to execute when the key is pressed
 * @param options - Additional options
 * @param options.enabled - Whether the hook is enabled
 * @param options.target - The target element to attach the listener to (defaults to document)
 * @param options.event - The event to listen for (defaults to 'keydown')
 */
export function useKeyPress(
  key: string | string[],
  handler: KeyHandler,
  options: {
    enabled?: boolean;
    target?: EventTarget;
    event?: 'keydown' | 'keyup' | 'keypress';
  } = {},
): void {
  const { enabled = true, target = document, event = 'keydown' } = options;

  // Memoize the keys array to prevent it from changing on every render
  const keys = useMemo(() => {
    return Array.isArray(key) ? key : [key];
  }, [key]);

  // Memoize the handler to prevent unnecessary re-renders
  const memoizedHandler = useCallback(
    (event: KeyboardEvent) => {
      if (keys.includes(event.key)) {
        handler(event);
      }
    },
    [keys, handler],
  );

  useEffect(() => {
    if (!enabled) return;

    // Add event listener
    target.addEventListener(event, memoizedHandler as EventListener);

    // Clean up
    return () => {
      target.removeEventListener(event, memoizedHandler as EventListener);
    };
  }, [enabled, target, event, memoizedHandler]);
}

/**
 * Custom hook to handle Escape key press
 *
 * @param handler - The callback function to execute when Escape is pressed
 * @param enabled - Whether the hook is enabled
 */
export function useEscapeKey(
  handler: KeyHandler,
  enabled: boolean = true,
): void {
  useKeyPress('Escape', handler, { enabled });
}

export default useKeyPress;
