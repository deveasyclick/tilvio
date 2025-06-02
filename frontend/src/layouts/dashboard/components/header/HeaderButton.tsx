import { memo } from 'react';
import Button from '../../../../components/Button/Button';

/**
 * Props for header button component
 */
export type HeaderButtonProps = {
  ariaControls: string;
  ariaExpanded?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  id?: string;
};

/**
 * Header button component with icon
 */
const HeaderButton = memo(
  ({
    ariaControls,
    ariaExpanded,
    onClick,
    children,
    className = '',
    id,
  }: HeaderButtonProps) => (
    <Button
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
      aria-haspopup="true"
      onClick={onClick}
      className={`p-2 mr-2 text-gray-600 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700  dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${className}`}
      id={id}>
      {children}
    </Button>
  ),
);

export default HeaderButton;
