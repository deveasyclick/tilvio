import { useCallback } from 'react';
import MainHeader from '../../components/Headers/main/Main';
import Sidebar from '../../components/Sidebar/Sidebar';
import MainContent from '../../components/MainContent/MainContent';
import { SidebarProvider } from '../../contexts/SidebarContext';

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
        <MainHeader
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
