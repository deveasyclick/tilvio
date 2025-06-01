import type React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {};

/**
 * To be used later
 * p-2 mr-2 text-gray-600 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700  dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white
 */
const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  className,
  ...props
}) => {
  return (
    <button {...props} className={className} type={type}>
      {children}
    </button>
  );
};

export default Button;
