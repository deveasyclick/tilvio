import React from 'react';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
};

/**
 * Reusable Select component
 *
 * @param label - Optional label for the select
 * @param error - Optional error message
 * @param className - Additional CSS classes
 * @param children - Option elements
 */
const Select: React.FC<SelectProps> = ({
  label,
  error,
  className = '',
  id,
  children,
  ...props
}) => {
  // Base classes for the select element
  const selectClasses =
    'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500';

  // Error state classes
  const errorClasses = error
    ? 'border-red-500 focus:ring-red-500 focus:border-red-500 dark:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500'
    : '';

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
      )}

      <select
        id={id}
        className={`${selectClasses} ${errorClasses} ${className}`}
        {...props}>
        {children}
      </select>

      {error && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default Select;
