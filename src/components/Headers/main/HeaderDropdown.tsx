import { memo, useRef } from 'react';
import { DropdownWrapper } from '../../../components/Dropdown';
import type { DropdownProps } from './types';
import useClickOutside from '../../../hooks/useClickOutside';

type HeaderDropdownProps = DropdownProps & {
  id: string;
  children: React.ReactNode;
  className?: string;
  position?: 'right' | 'left' | 'center';
};

/**
 * Reusable header dropdown component with click-outside handling
 */
const HeaderDropdown = memo(
  ({
    isOpen,
    onClose,
    id,
    children,
    className = '',
    position = 'right',
  }: HeaderDropdownProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Handle click outside to close dropdown
    useClickOutside(dropdownRef, onClose || (() => {}), isOpen && !!onClose);

    if (!isOpen) return null;

    return (
      <div ref={dropdownRef}>
        <DropdownWrapper
          isOpen={isOpen}
          id={id}
          className={className}
          position={position}>
          {children}
        </DropdownWrapper>
      </div>
    );
  },
);

export default HeaderDropdown;
