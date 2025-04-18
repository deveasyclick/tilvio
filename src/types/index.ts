import type { Icons } from '../constants/icons';

export type IconNames = keyof typeof Icons;

export type IconWrapperProps = {
  name: IconNames;
  size?: string;
} & React.SVGProps<SVGSVGElement>;

export type IconProps = React.SVGProps<SVGSVGElement>;
