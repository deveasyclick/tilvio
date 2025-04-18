import { memo, ReactNode } from 'react';

/**
 * Props for dropdown footer component
 */
type DropdownFooterProps = {
  children: ReactNode;
  href?: string;
  className?: string;
};

/**
 * Reusable dropdown footer component
 *
 * Used as a standardized footer for dropdown menus throughout the application
 */
const DropdownFooter = memo(
  ({ children, href = '#', className = '' }: DropdownFooterProps) => (
    <a
      href={href}
      className={`block py-2 text-md font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100 dark:bg-gray-600 dark:text-white dark:hover:underline ${className}`}>
      {children}
    </a>
  ),
);

export default DropdownFooter;
