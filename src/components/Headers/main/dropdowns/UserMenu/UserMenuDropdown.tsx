import { memo } from 'react';
import { DropdownHeader } from '../../../../Dropdown';
import HeaderDropdown from '../../HeaderDropdown';
import Image from '../../../../Image';
import { DEFAULT_IMAGES } from '../../../../../constants/images';
import { DropdownProps } from '../../types';
import { MenuItem, getDefaultMenuSections, UserMenuCallbacks } from './index';

/**
 * Props for user menu dropdown component
 */
type UserMenuDropdownProps = DropdownProps & {
  /** User's display name */
  userName?: string;
  /** User's email address */
  userEmail?: string;
  /** Optional avatar URL */
  userAvatarUrl?: string;
} & UserMenuCallbacks;

/**
 * User menu dropdown component
 *
 * Displays user information and menu options for account management
 */
const UserMenuDropdown = memo(
  ({
    isOpen,
    onClose,
    userName = 'Neil Sims',
    userEmail = 'name@test.com',
    userAvatarUrl,
    onProfileClick,
    onSettingsClick,
    onLikesClick,
    onCollectionsClick,
    onProVersionClick,
    onSignOut,
  }: UserMenuDropdownProps) => {
    // Get menu sections with callback handlers
    const menuSections = getDefaultMenuSections({
      onProfileClick,
      onSettingsClick,
      onLikesClick,
      onCollectionsClick,
      onProVersionClick,
      onSignOut,
    });

    return (
      <HeaderDropdown
        isOpen={isOpen}
        onClose={onClose}
        id="user-menu-dropdown"
        className="w-56"
        position="right">
        <DropdownHeader title="User Menu" />
        <div className="py-3 px-4" role="presentation">
          {userAvatarUrl && (
            <div className="flex items-center mb-3">
              <Image
                className="w-10 h-10 rounded-full mr-2"
                src={userAvatarUrl}
                alt={`${userName}'s avatar`}
                fallbackSrc={DEFAULT_IMAGES.USER_AVATAR}
                objectFit="cover"
              />
            </div>
          )}
          <span className="block text-sm font-semibold text-gray-900 dark:text-white">
            {userName}
          </span>
          <span className="block text-sm text-gray-900 truncate dark:text-white">
            {userEmail}
          </span>
        </div>

        {menuSections.map((section) => (
          <ul
            key={section.id}
            className="py-1 text-gray-700 dark:text-gray-300"
            aria-label={section.ariaLabel}>
            {section.items.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </ul>
        ))}
      </HeaderDropdown>
    );
  },
);

export default UserMenuDropdown;
