import { memo } from 'react';
import { Link } from 'react-router';
import IconWrapper from '../../IconWrapper/IconWrapper';
import type { SidebarNavItemData } from '../sidebarNavigationData';

/**
 * Props for the SidebarNavItem component
 */
type SidebarNavItemProps = {
  item: SidebarNavItemData;
};

/**
 * Sidebar navigation item component
 *
 * Renders a single navigation item in the sidebar with consistent styling
 */
const SidebarNavItem = memo(({ item }: SidebarNavItemProps) => {
  const { label, href, iconName, badge } = item;

  //TODO: Improve
  // Determine badge styling based on variant
  const getBadgeClasses = () => {
    if (!badge) return '';

    switch (badge.variant) {
      case 'primary':
        return 'inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-primary-800 bg-primary-100 rounded-full dark:bg-primary-900 dark:text-primary-300';
      case 'gray':
        return 'inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300';
      case 'success':
        return 'inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-300';
      default:
        return 'inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <li>
      <Link
        to={href}
        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
        <IconWrapper
          name={iconName}
          className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
          aria-hidden="true"
        />
        <span className="flex-1 ms-3 whitespace-nowrap">{label}</span>
        {badge && <span className={getBadgeClasses()}>{badge.text}</span>}
      </Link>
    </li>
  );
});

export default SidebarNavItem;
