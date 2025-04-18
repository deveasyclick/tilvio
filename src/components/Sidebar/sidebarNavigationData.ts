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
    id: 'kanban',
    label: 'Kanban',
    href: '/kanban',
    iconName: 'collection',
    badge: {
      text: 'Pro',
      variant: 'gray',
    },
  },
  {
    id: 'inbox',
    label: 'Inbox',
    href: '/inbox',
    iconName: 'inbox',
    badge: {
      text: '3',
      variant: 'primary',
    },
  },
  {
    id: 'users',
    label: 'Users',
    href: '/users',
    iconName: 'userCircle',
  },
  {
    id: 'products',
    label: 'Products',
    href: '/products',
    iconName: 'bucket',
  },
  {
    id: 'signin',
    label: 'Sign In',
    href: '/signin',
    iconName: 'logout',
  },
  {
    id: 'signup',
    label: 'Sign Up',
    href: '/signup',
    iconName: 'userAdd',
  },
];
