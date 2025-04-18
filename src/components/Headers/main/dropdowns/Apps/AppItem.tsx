import { memo } from 'react';
import IconWrapper from '../../../../IconWrapper/IconWrapper';
import type { IconNames } from '../../../../../types';

/**
 * Props for app item component
 */
type AppItemProps = {
  title: string;
  href?: string;
  icon: IconNames;
  onClick?: () => void;
};

/**
 * Reusable app item component for the apps dropdown
 *
 * Used to display app icons in a grid layout with consistent styling
 */
const AppItem = memo(({ title, href = '#', icon, onClick }: AppItemProps) => (
  <a
    href={href}
    onClick={onClick}
    className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
    aria-label={title}>
    <div className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400">
      <IconWrapper name={icon} />
    </div>
    <div className="text-sm text-gray-900 dark:text-white">{title}</div>
  </a>
));

export default AppItem;
