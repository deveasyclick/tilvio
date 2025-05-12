import { memo } from 'react';
import IconWrapper from '../../../../IconWrapper/IconWrapper';
import type { MenuItemData } from './userMenuData';

/**
 * Props for the MenuItem component
 */
type MenuItemProps = {
  /** Menu item data */
  item: MenuItemData;
};

/**
 * Renders a menu item for the user dropdown
 *
 * @param props - Component props
 * @returns MenuItem component
 */
const MenuItem = memo(
  ({ item: { href, onClick, iconName, isExternal, label } }: MenuItemProps) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        // If there's a click handler, prevent default navigation
        e.preventDefault();
        onClick();
      }
    };

    return (
      <li>
        <a
          className="py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white flex items-center"
          href={href}
          onClick={handleClick}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}>
          <IconWrapper
            name={iconName}
            className="w-5 h-5 text-gray-400 mr-2"
            aria-hidden="true"
          />
          {label}
        </a>
      </li>
    );
  },
);

export default MenuItem;
