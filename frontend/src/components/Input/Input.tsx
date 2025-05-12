type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {};
const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return <input {...props} className={'input ' + className} />;
};

export default Input;
