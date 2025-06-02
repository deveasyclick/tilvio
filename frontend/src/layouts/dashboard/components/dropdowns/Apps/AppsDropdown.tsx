import { memo } from 'react';
import HeaderDropdown from '../../header/HeaderDropdown';
import AppItem from './AppItem';
import { appItems } from './appData';
import type { DropdownProps } from '../../../types';
import { DropdownHeader } from '../../../../../components/Dropdown';

/**
 * Apps dropdown component
 *
 * Displays a grid of application icons that users can click to navigate to different parts of the app.
 * Uses the IconWrapper component to render icons based on the iconName property from appItems.
 */
const AppsDropdown = memo(({ isOpen, onClose }: DropdownProps) => (
  <HeaderDropdown
    isOpen={isOpen}
    onClose={onClose}
    id="apps-dropdown"
    className="max-w-sm"
    position="right">
    <DropdownHeader title="Apps" />
    <div
      className="grid grid-cols-3 gap-4 p-4"
      role="menu"
      aria-labelledby="apps-dropdown-button">
      {appItems.map((app) => (
        <AppItem
          key={app.id}
          title={app.title}
          href={app.href}
          icon={app.iconName}
        />
      ))}
    </div>
  </HeaderDropdown>
));

export default AppsDropdown;
