import { memo } from 'react';
import HeaderDropdown from '../../header/HeaderDropdown';
import { DEFAULT_IMAGES } from '../../../../../constants/images';
import { MenuItem, getDefaultMenuItems, UserMenuCallbacks } from './index';
import { SignOutButton } from '@clerk/react-router';
import type { DropdownProps } from '../../../types';
import { DropdownHeader } from '../../../../../components/Dropdown';
import Image from '../../../../../components/Image';
import IconWrapper from '../../../../../components/IconWrapper/IconWrapper';

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
    const menuItems = getDefaultMenuItems({
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
        <div className="py-3 px-4">
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

        <ul className="py-1 text-gray-700 dark:text-gray-300">
          {menuItems.map((item) => (
            <MenuItem key={item.id} item={item} />
          ))}
        </ul>
        <SignOutButton redirectUrl="/signin">
          <button className="py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white flex items-center w-full cursor-pointer">
            <IconWrapper
              name={'logout'}
              className="w-5 h-5 text-gray-400 mr-2"
              aria-hidden="true"
            />
            Sign out
          </button>
        </SignOutButton>
      </HeaderDropdown>
    );
  },
);

export default UserMenuDropdown;
