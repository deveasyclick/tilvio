import { memo } from 'react';
import { DropdownItem } from '../../../../../components/Dropdown';
import IconWrapper from '../../../../../components/IconWrapper/IconWrapper';
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
const MenuItem = memo(({ item }: MenuItemProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (item.onClick) {
      // If there's a click handler, prevent default navigation
      e.preventDefault();
      item.onClick();
    }
  };

  return (
    <li>
      <DropdownItem
        href={item.href || '#'}
        onClick={handleClick}
        icon={
          <IconWrapper
            name={item.iconName}
            className={`w-5 h-5 ${item.iconColorClass || 'text-gray-400'}`}
            aria-hidden="true"
          />
        }
        rightContent={
          item.rightIconName ? (
            <IconWrapper
              name={item.rightIconName}
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          ) : undefined
        }
        justifyBetween={item.justifyBetween}
        target={item.isExternal ? '_blank' : undefined}
        rel={item.isExternal ? 'noopener noreferrer' : undefined}>
        {item.label}
      </DropdownItem>
    </li>
  );
});

export default MenuItem;
