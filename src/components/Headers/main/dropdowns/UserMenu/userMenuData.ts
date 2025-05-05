import { IconNames } from '../../../../../types';

/**
 * Menu item data for user menu dropdown
 */
export type MenuItemData = {
  id: string;
  label: string;
  iconName: IconNames;
  href?: string;
  onClick?: () => void;
  justifyBetween?: boolean;
  isExternal?: boolean;
};

/**
 * Props for user menu dropdown component
 */
export type UserMenuCallbacks = {
  /** Optional callback for profile click */
  onProfileClick?: () => void;
  /** Optional callback for settings click */
  onSettingsClick?: () => void;
  /** Optional callback for likes click */
  onLikesClick?: () => void;
  /** Optional callback for collections click */
  onCollectionsClick?: () => void;
  /** Optional callback for pro version click */
  onProVersionClick?: () => void;
  /** Optional callback for sign out */
  onSignOut?: () => void;
};

/**
 * Default menu sections configuration
 *
 * @param callbacks - Callback functions for menu items
 * @returns Array of menu sections with their items
 */
export const getDefaultMenuItems = (
  callbacks: UserMenuCallbacks,
): MenuItemData[] => [
  {
    id: 'profile',
    label: 'My profile',
    iconName: 'profile',
    onClick: callbacks.onProfileClick,
    href: '/profile',
  },
  {
    id: 'settings',
    label: 'Account settings',
    iconName: 'settings',
    onClick: callbacks.onSettingsClick,
    href: '/settings',
  },
];
