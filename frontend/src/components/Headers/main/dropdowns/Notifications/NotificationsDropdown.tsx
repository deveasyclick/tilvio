import { memo } from 'react';
import { DropdownHeader, DropdownFooter } from '../../../../Dropdown';
import HeaderDropdown from '../../HeaderDropdown';
import { DropdownProps } from '../../types';
import { NotificationItem, notificationItems } from '.';
import IconWrapper from '../../../../IconWrapper/IconWrapper';

/**
 * Notifications dropdown component
 *
 * Displays a list of notifications with different types and styles
 */
const NotificationsDropdown = memo(({ isOpen, onClose }: DropdownProps) => (
  <HeaderDropdown
    isOpen={isOpen}
    onClose={onClose}
    id="notification-dropdown"
    className="max-w-sm"
    position="right"
    aria-labelledby="notification-dropdown-button">
    <DropdownHeader title="Notifications" />
    <div role="menu">
      {notificationItems.map((notification, index) => (
        <NotificationItem
          key={notification.id}
          avatarSrc={notification.avatarSrc}
          avatarAlt={notification.avatarAlt}
          content={notification.content}
          timestamp={notification.timestamp}
          badgeIcon={notification.badgeIcon}
          badgeColor={notification.badgeColor}
          href={notification.href}
          isLastItem={index === notificationItems.length - 1}
        />
      ))}
    </div>
    <DropdownFooter>
      <div className="inline-flex items-center">
        <IconWrapper
          name="eye"
          className="mr-2 w-4 h-4 text-gray-500 dark:text-gray-400"
        />
        View all
      </div>
    </DropdownFooter>
  </HeaderDropdown>
));

export default NotificationsDropdown;
