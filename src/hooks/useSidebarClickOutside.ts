import { useEffect, useRef } from 'react';
import useClickOutside from './useClickOutside';

/**
 * Custom hook to handle clicks outside the sidebar on mobile devices
 *
 * @param closeSidebar - Function to close the sidebar
 * @param sidebarId - ID of the sidebar element
 * @param toggleButtonId - ID of the toggle button element
 * @param mobileOnly - Whether to only apply this behavior on mobile devices
 * @param mobileBreakpoint - Screen width below which is considered mobile
 */
export function useSidebarClickOutside(
  closeSidebar: () => void,
  sidebarId: string = 'drawer-navigation',
  toggleButtonId: string = 'sidebar-toggle-button',
  mobileOnly: boolean = true,
  mobileBreakpoint: number = 768,
): void {
  // Create refs for the sidebar and toggle button
  const sidebarRef = useRef<HTMLElement | null>(null);
  const toggleButtonRef = useRef<HTMLElement | null>(null);

  // Set up the refs to point to the DOM elements
  useEffect(() => {
    sidebarRef.current = document.getElementById(sidebarId);
    toggleButtonRef.current = document.getElementById(toggleButtonId);
  }, [sidebarId, toggleButtonId]);

  // Function to check if we're on mobile
  const isMobileDevice = () => {
    return window.innerWidth < mobileBreakpoint;
  };

  // Custom handler that only calls closeSidebar if we're on mobile (when mobileOnly is true)
  const handleClickOutside = () => {
    if (!mobileOnly || (mobileOnly && isMobileDevice())) {
      closeSidebar();
    }
  };

  // Use the existing useClickOutside hook with our refs and handler
  useClickOutside([sidebarRef, toggleButtonRef], handleClickOutside, true);
}
