import { useState, useEffect } from 'react';

/**
 * Custom hook to check if the current viewport matches a media query
 * 
 * @param query - The media query to check against (e.g., '(min-width: 768px)')
 * @returns boolean indicating if the viewport matches the query
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with the current match state
  const [matches, setMatches] = useState<boolean>(() => {
    // Check if window is available (for SSR)
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    // Ensure we're in a browser environment
    if (typeof window === 'undefined') return;

    // Create media query list
    const mediaQueryList = window.matchMedia(query);

    // Update the state initially
    setMatches(mediaQueryList.matches);

    // Define callback for media query change
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Modern browsers
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleChange);
      return () => {
        mediaQueryList.removeEventListener('change', handleChange);
      };
    } 
    // Older browsers (Safari < 14, IE, etc.)
    else {
      mediaQueryList.addListener(handleChange);
      return () => {
        mediaQueryList.removeListener(handleChange);
      };
    }
  }, [query]);

  return matches;
}

/**
 * Custom hook to check if the current viewport is mobile
 * 
 * @param breakpoint - The breakpoint in pixels below which is considered mobile
 * @returns boolean indicating if the viewport is mobile
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  return !useMediaQuery(`(min-width: ${breakpoint}px)`);
}

export default useMediaQuery;
