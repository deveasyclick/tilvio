import type { Icons } from '../constants/icons';

export type IconNames = keyof typeof Icons;

export type IconWrapperProps = {
  name: IconNames;
  size?: string;
} & React.SVGProps<SVGSVGElement>;

export type IconProps = React.SVGProps<SVGSVGElement>;

export type Theme = 'light' | 'dark' | 'system';

export type FilterResponse<T extends object> = T & {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export interface APIResponse<T> {
  message: string;
  data: T;
  code: string;
}

export type SortDirection = 'asc' | 'desc';

export interface SortConfig<T> {
  field: T;
  direction: SortDirection;
}

export type Status = 'active' | 'inactive' | 'pending';
