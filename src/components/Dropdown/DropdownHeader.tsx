import { memo } from 'react';

/**
 * Props for dropdown header component
 */
type DropdownHeaderProps = {
  title: string;
};

/**
 * Reusable dropdown header component
 * 
 * Used as a standardized header for dropdown menus throughout the application
 */
const DropdownHeader = memo(({ title }: DropdownHeaderProps) => (
  <div className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300">
    {title}
  </div>
));

export default DropdownHeader;
