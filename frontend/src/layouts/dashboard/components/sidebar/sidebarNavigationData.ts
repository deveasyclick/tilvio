import { IconNames } from '../../../../types';

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
    id: 'pricelists',
    label: 'Price Lists',
    href: '/pricelists',
    iconName: 'dollar',
  },
  {
    id: 'tiles',
    label: 'Tiles',
    href: '/tiles',
    iconName: 'grid',
  },
  {
    id: 'orders',
    label: 'Orders',
    href: '/orders',
    iconName: 'truck',
  },
];
