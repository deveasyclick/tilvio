import { useRef } from 'react';
import SidebarSearch from './SidebarSearch';
import SidebarNavigation from './SidebarNavigation';
import { useSidebar } from '../../contexts/SidebarContext';
import { useSidebarClickOutside } from '../../hooks/useSidebarClickOutside';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { useEscapeKey } from '../../hooks/useKeyPress';
import { useFocusEffect } from '../../hooks/useFocusEffect';

export default function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useSidebar();

  // Use our custom hook to check if we're on mobile
  const isMobile = useIsMobile();

  // Ref for the sidebar element for focus management
  const sidebarRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Use the custom hook to handle clicks outside the sidebar
  useSidebarClickOutside(closeSidebar);

  // Handle Escape key press to close sidebar on mobile
  const handleEscapeKey = () => {
    if (isSidebarOpen && isMobile) {
      closeSidebar();
    }
  };

  // Use our custom hook for keyboard events
  useEscapeKey(handleEscapeKey, true);

  // Use our custom hook for focus management
  useFocusEffect(closeButtonRef, isSidebarOpen && isMobile, { delay: 100 });

  return (
    <>
      {/* Sidebar overlay for mobile */}
      <div
        className={`fixed inset-0 bg-gray-900 transition-opacity duration-300 z-30 md:hidden ${isSidebarOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
        onClick={closeSidebar}
        aria-hidden="true"
        role="presentation"
        tabIndex={-1}
        data-testid="sidebar-overlay"
      />

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 shadow-lg`}
        aria-label="Navigation sidebar"
        aria-hidden={!isSidebarOpen && isMobile}
        aria-modal={isSidebarOpen && isMobile}
        role="dialog"
        id="drawer-navigation"
        data-testid="sidebar-navigation"
        tabIndex={-1}>
        <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          {/* Close button - visible only on mobile */}
          {isMobile && (
            <button
              ref={closeButtonRef}
              type="button"
              className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white md:hidden"
              onClick={closeSidebar}
              aria-label="Close sidebar"
              data-testid="sidebar-close-button">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"></path>
              </svg>
            </button>
          )}
          <SidebarSearch />
          <SidebarNavigation />
        </div>
      </aside>
    </>
  );
}
