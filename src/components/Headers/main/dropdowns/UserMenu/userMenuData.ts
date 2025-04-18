import { IconNames } from '../../../../../types';

/**
 * Section data for user menu dropdown
 */
export type MenuSection = {
  id: string;
  title?: string;
  ariaLabel: string;
  items: MenuItemData[];
};

/**
 * Menu item data for user menu dropdown
 */
export type MenuItemData = {
  id: string;
  label: string;
  iconName: IconNames;
  iconColorClass?: string;
  href?: string;
  onClick?: () => void;
  rightIconName?: IconNames;
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
export const getDefaultMenuSections = (
  callbacks: UserMenuCallbacks,
): MenuSection[] => [
  {
    id: 'account',
    ariaLabel: 'Account management options',
    items: [
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
    ],
  },
  {
    id: 'features',
    ariaLabel: 'Feature options',
    items: [
      {
        id: 'likes',
        label: 'My likes',
        iconName: 'heart',
        onClick: callbacks.onLikesClick,
        href: '/likes',
      },
      {
        id: 'collections',
        label: 'Collections',
        iconName: 'collection',
        onClick: callbacks.onCollectionsClick,
        href: '/collections',
      },
      {
        id: 'pro',
        label: 'Pro version',
        iconName: 'fire',
        iconColorClass: 'text-primary-600 dark:text-primary-500',
        rightIconName: 'chevronRight',
        justifyBetween: true,
        onClick: callbacks.onProVersionClick,
        href: '/pro',
      },
    ],
  },
  {
    id: 'auth',
    ariaLabel: 'Authentication options',
    items: [
      {
        id: 'signout',
        label: 'Sign out',
        iconName: 'logout',
        onClick: callbacks.onSignOut,
        href: '/logout',
      },
    ],
  },
];
