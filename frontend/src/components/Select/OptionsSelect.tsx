import React from 'react';
import Select from './Select';
import type { OptionType } from './OptionType';

type OptionsSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: OptionType[];
};

/**
 *
 * @param label - Optional label for the select
 * @param error - Optional error message
 */
const OptionsSelect: React.FC<OptionsSelectProps> = ({
  label,
  error,
  className = '',
  options,
  ...props
}) => {
  return (
    <div>
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

export default OptionsSelect;
