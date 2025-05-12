import type { IconNames } from '../../../../../types';

/**
 * Type definition for app items in the apps dropdown
 */
export type AppItemData = {
  id: string;
  title: string;
  href: string;
  iconName: IconNames;
};

/**
 * App items data for the apps dropdown
 */
export const appItems: AppItemData[] = [
  {
    id: 'sales',
    title: 'Sales',
    href: '#',
    iconName: 'shoppingBag',
  },
  {
    id: 'users',
    title: 'Users',
    href: '#',
    iconName: 'userCircle',
  },
  {
    id: 'inbox',
    title: 'Inbox',
    href: '#',
    iconName: 'inbox',
  },
  {
    id: 'profile',
    title: 'Profile',
    href: '#',
    iconName: 'profile',
  },
  {
    id: 'settings',
    title: 'Settings',
    href: '#',
    iconName: 'settings',
  },
  {
    id: 'products',
    title: 'Products',
    href: '#',
    iconName: 'bucket',
  },
  {
    id: 'pricing',
    title: 'Pricing',
    href: '#',
    iconName: 'dollarCircle',
  },
  {
    id: 'logout',
    title: 'Logout',
    href: '#',
    iconName: 'logout',
  },
];
