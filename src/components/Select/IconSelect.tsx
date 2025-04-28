import React from 'react';
import { IconNames } from '../../types';
import IconWrapper from '../IconWrapper/IconWrapper';
import Select from './Select';
import type { OptionType } from './OptionType';

type IconSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  iconName: IconNames;
  iconSize?: string;
  iconClassName?: string;
  options: OptionType[];
};

/**
 * Select component with an icon
 *
 * @param label - Optional label for the select
 * @param error - Optional error message
 * @param iconName - Name of the icon to display
 * @param iconSize - Size of the icon (default: '20')
 * @param iconClassName - Additional classes for the icon
 */
const IconSelect: React.FC<IconSelectProps> = ({
  label,
  error,
  iconName,
  iconSize = '20',
  iconClassName = 'text-gray-500 dark:text-gray-400',
  className = '',
  options,
  ...props
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <IconWrapper
          name={iconName}
          size={iconSize}
          className={iconClassName}
        />
      </div>
      <Select
        label={label}
        error={error}
        className={`pl-10 ${className}`}
        {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default IconSelect;
