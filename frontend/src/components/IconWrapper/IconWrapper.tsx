import { Icons } from '../../constants/icons';
import type { IconWrapperProps } from '../../types';

const IconWrapper: React.FC<IconWrapperProps> = ({
  name,
  size = '24',
  ...rest
}) => {
  const Icon = Icons[name];

  if (!Icon) {
    console.warn(`Icon "${name}" does not exist.`);
    return null;
  }

  return <Icon width={size} height={size} {...rest} />;
};

export default IconWrapper;
