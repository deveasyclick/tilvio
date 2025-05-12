import { IconNames } from '../../types';

/**
 * Type definition for sidebar navigation items
 */
export type SidebarNavItemData = {
  id: string;
  label: string;
  href: string;
  iconName: IconNames;
  badge?: {
    text: string;
    variant: 'primary' | 'gray' | 'success';
  };
};

/**
 * Sidebar navigation items data
 */
export const sidebarNavItems: SidebarNavItemData[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/',
    iconName: 'apps',
  },
  {
    id: 'members',
    label: 'Members',
    href: '/members',
    iconName: 'userCircle',
    badge: {
      text: 'Pro',
      variant: 'gray',
    },
  },
  {
    id: 'loans',
    label: 'Loans',
    href: '/loans',
    iconName: 'collection',
    badge: {
      text: '3',
      variant: 'primary',
    },
  },
];
