import { memo } from 'react';
import Button from '../../Button/Button';
import { HeaderButtonProps } from './types';

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
