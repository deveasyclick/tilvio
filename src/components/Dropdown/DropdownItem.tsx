import { memo, ReactNode } from 'react';

/**
 * Props for dropdown item component
 */
type DropdownItemProps = {
  children: ReactNode;
  href?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  icon?: ReactNode;
  rightContent?: ReactNode;
  justifyBetween?: boolean;
  /** Target attribute for the anchor element (e.g., '_blank') */
  target?: string;
  /** Rel attribute for the anchor element (e.g., 'noopener noreferrer') */
  rel?: string;
};

/**
 * Reusable dropdown item component
 *
 * Used as a standardized item for dropdown menus throughout the application
 * Supports optional icon on the left and content on the right
 */
const DropdownItem = memo(
  ({
    children,
    href = '#',
    className = '',
    onClick,
    icon,
    rightContent,
    justifyBetween = false,
    target,
    rel,
  }: DropdownItemProps) => {
    const baseClasses = `py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white ${className}`;

    return (
      <a
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        className={`${baseClasses} ${icon || rightContent ? 'flex' : 'block'} ${justifyBetween ? 'justify-between' : ''} items-center`}>
        {icon && <span className="mr-2">{icon}</span>}
        {justifyBetween ? (
          <>
            <span className="flex items-center">{children}</span>
            {rightContent && <span>{rightContent}</span>}
          </>
        ) : (
          <>
            {children}
            {rightContent && <span className="ml-auto">{rightContent}</span>}
          </>
        )}
      </a>
    );
  },
);

export default DropdownItem;
