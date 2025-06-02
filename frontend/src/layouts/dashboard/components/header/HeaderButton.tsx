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
      className={className}
      id={id}>
      {children}
    </Button>
  ),
);

export default HeaderButton;
