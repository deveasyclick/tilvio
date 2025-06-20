import type { IconNames } from '../../types';
import IconWrapper from '../IconWrapper/IconWrapper';
import Input from './Input';

type IconInputProps = {
  type: React.HTMLInputTypeAttribute;
  name: string;
  placeholder: string;
  iconName: IconNames;
  className?: string;
  id?: string;
  inputClassName?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const IconInput: React.FC<IconInputProps> = ({
  type,
  name,
  id,
  placeholder,
  iconName,
  inputClassName,
  onChange,
}) => {
  return (
    <div className="relative md:w-64 md:w-96">
      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <IconWrapper name={iconName} />
      </div>
      <Input
        placeholder={placeholder}
        type={type}
        id={id}
        name={name}
        className={inputClassName}
        onChange={onChange}
      />
    </div>
  );
};

export default IconInput;
