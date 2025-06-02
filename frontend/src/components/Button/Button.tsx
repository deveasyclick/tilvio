import type React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {};

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
