import type { IconNames } from '../../../types';

export type SortDirection = 'asc' | 'desc';

export interface SortConfig<T extends string> {
  field: T;
  direction: SortDirection;
}

export interface TableColumn<T, K extends string> {
  id: K;
  header: string;
  accessor: (item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
  headerClassName?: string;
}

export interface TableAction<T> {
  icon: IconNames;
  label: string;
  onClick: (item: T) => void;
  className?: string;
  iconSize?: string;
  condition?: (item: T) => boolean;
}

export interface TableProps<T, K extends string> {
  data: T[];
  columns: TableColumn<T, K>[];
  keyField: keyof T;
  actions?: TableAction<T>[];
  sortConfig?: SortConfig<K>;
  onSort?: (field: K) => void;
  selectable?: boolean;
  selectedItems?: string[];
  onSelectItem?: (id: string, isSelected: boolean) => void;
  onSelectAll?: (isSelected: boolean) => void;
  emptyMessage?: string;
  className?: string;
  tableClassName?: string;
  headerClassName?: string;
  rowClassName?: (item: T) => string;
}
