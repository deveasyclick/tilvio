import { Outlet } from 'react-router';
import MainHeader from './components/Header';
import { useUser } from '@clerk/clerk-react';

/**
 * Dashboard Layout Component
 *
 * Provides a consistent layout for all dashboard pages with:
 * - Header with user menu
 * - Sidebar navigation
 * - Main content area that renders child routes via Outlet
 */
export default function MainLayout() {
  const { user } = useUser();
  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">
      <MainHeader
        userName={user?.firstName ?? ''}
        userEmail={user?.primaryEmailAddress?.emailAddress ?? ''}
      />
      <main className="p-4 h-auto pt-20 w-full">
        <Outlet />
      </main>
    </div>
  );
}
