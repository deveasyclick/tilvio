import { useCallback } from 'react';
import { Outlet } from 'react-router';
import MainHeader from '../components/Headers/main/Main';
import Sidebar from '../components/Sidebar/Sidebar';
import { SidebarProvider } from '../contexts/SidebarContext';

/**
 * Dashboard Layout Component
 *
 * Provides a consistent layout for all dashboard pages with:
 * - Header with user menu
 * - Sidebar navigation
 * - Main content area that renders child routes via Outlet
 */
export default function DashboardLayout() {
  // Example callback handlers for user menu actions
  const handleProfileClick = useCallback(() => {
    console.log('Profile clicked in Dashboard');
    // Add navigation or other logic here
  }, []);

  const handleSettingsClick = useCallback(() => {
    console.log('Settings clicked in Dashboard');
    // Add navigation or other logic here
  }, []);

  const handleSignOut = useCallback(() => {
    console.log('Sign out clicked in Dashboard');
    // Add authentication logout logic here
  }, []);

  return (
    <SidebarProvider>
      <div className="antialiased bg-gray-50 dark:bg-gray-900">
        <MainHeader
          onProfileClick={handleProfileClick}
          onSettingsClick={handleSettingsClick}
          onSignOut={handleSignOut}
          userName="John Doe"
          userEmail="admin@dashboard.org"
        />
        <Sidebar />
        <main className="p-4 md:ml-64 h-auto pt-20">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
