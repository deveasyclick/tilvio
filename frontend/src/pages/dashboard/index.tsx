import { useCallback } from 'react';
import Sidebar from '../../layouts/dashboard/components/sidebar/Sidebar';
import MainContent from '../../components/MainContent/MainContent';
import { SidebarProvider } from '../../contexts/sidebar';
import DashboardHeader from '../../layouts/dashboard/components/header';

export default function Dashboard() {
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
        <DashboardHeader
          onProfileClick={handleProfileClick}
          onSettingsClick={handleSettingsClick}
          onSignOut={handleSignOut}
          userName="John Doe"
          userEmail="admin@dashboard.org"
        />
        <Sidebar />
        <MainContent />
      </div>
    </SidebarProvider>
  );
}
