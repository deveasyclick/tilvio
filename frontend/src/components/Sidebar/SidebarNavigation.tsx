import { memo } from 'react';
import SidebarNavItem from './SidebarNavItem';
import { sidebarNavItems } from './sidebarNavigationData';

/**
 * Sidebar navigation component
 *
 * Renders the navigation menu in the sidebar
 */
const SidebarNavigation = memo(() => {
  return (
    <ul className="space-y-2 font-medium">
      {sidebarNavItems.map((item) => (
        <SidebarNavItem key={item.id} item={item} />
      ))}
    </ul>
  );
});

export default SidebarNavigation;
