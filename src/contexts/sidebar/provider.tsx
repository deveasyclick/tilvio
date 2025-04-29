import { useState, useEffect, ReactNode } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import { SidebarContext } from './context';

export function SidebarProvider({ children }: { children: ReactNode }) {
  // Use our custom hook to check if we're on desktop
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // Initialize sidebar state based on screen size
  const [isSidebarOpen, setIsSidebarOpen] = useState(isDesktop);

  // Update sidebar state when screen size changes
  useEffect(() => {
    // Auto-open on desktop, keep current state on mobile
    if (isDesktop) {
      setIsSidebarOpen(true);
    }
  }, [isDesktop]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev: boolean) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  return (
    <SidebarContext.Provider
      value={{ isSidebarOpen, toggleSidebar, closeSidebar, openSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}
