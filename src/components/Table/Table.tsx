import React from 'react';
import IconWrapper from '../IconWrapper/IconWrapper';
import Button from '../Button/Button';
import Input from '../Input/Input';
import type { TableProps } from './types/index';

// Table style constants for consistent styling
const tableStyles = {
  container: 'relative overflow-x-auto shadow-md sm:rounded-lg',
  table: 'w-full text-sm text-left text-gray-500 dark:text-gray-400',
  header:
    'text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400',
  headerCell: 'px-6 py-3',
  sortableHeaderCell: 'px-6 py-3 cursor-pointer',
  row: 'bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600',
  cell: 'px-6 py-4',
  checkboxCell: 'w-4 p-4',
  actionButton: 'font-medium hover:underline',
  actionButtonPrimary: 'text-blue-600 dark:text-blue-500',
  actionButtonDanger: 'text-red-600 dark:text-red-500',
  emptyMessage: 'px-6 py-4 text-center',
  checkbox:
    'w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600',
};

/**
 * Reusable Table component
 */
function Table<T, K extends string>({
  data,
  columns,
  keyField,
  actions,
  sortConfig,
  onSort,
  selectable = false,
  selectedItems = [],
  onSelectItem,
  onSelectAll,
  emptyMessage = 'No data found',
  className = '',
  tableClassName = '',
  headerClassName = '',
  rowClassName = () => '',
}: TableProps<T, K>) {
  const allSelected =
    data.length > 0 && selectedItems && selectedItems.length === data.length;

  const handleSort = (field: K) => {
    if (onSort) {
      onSort(field);
    }
  };

  const renderSortIcon = (field: K) => {
    if (!sortConfig || sortConfig.field !== field) {
      return (
        <IconWrapper name="sort" size="16" className="ml-1 text-gray-400" />
      );
    }

    return sortConfig.direction === 'asc' ? (
      <IconWrapper
        name="sortUp"
        size="16"
        className="ml-1 text-gray-700 dark:text-gray-300"
      />
    ) : (
      <IconWrapper
        name="sortDown"
        size="16"
        className="ml-1 text-gray-700 dark:text-gray-300"
      />
    );
  };

  return (
    <div className={`${tableStyles.container} ${className}`}>
      <table className={`${tableStyles.table} ${tableClassName}`}>
        <thead className={`${tableStyles.header} ${headerClassName}`}>
          <tr>
            {selectable && (
              <th scope="col" className={tableStyles.checkboxCell}>
                <div className="flex items-center">
                  <Input
                    id="checkbox-all-search"
                    type="checkbox"
                    checked={allSelected}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onSelectAll?.(e.target.checked)
                    }
                    className={tableStyles.checkbox}
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
            )}

            {columns.map((column) => (
              <th
                key={column.id}
                scope="col"
                className={`${column.sortable ? tableStyles.sortableHeaderCell : tableStyles.headerCell} ${column.headerClassName || ''}`}
                onClick={() => column.sortable && handleSort(column.id)}>
                <div className="flex items-center">
                  {column.header}
                  {column.sortable && renderSortIcon(column.id)}
                </div>
              </th>
            ))}

            {actions && actions.length > 0 && (
              <th scope="col" className={tableStyles.headerCell}>
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr className={tableStyles.row}>
              <td
                colSpan={
                  columns.length +
                  (selectable ? 1 : 0) +
                  (actions && actions.length > 0 ? 1 : 0)
                }
                className={tableStyles.emptyMessage}>
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item) => {
              const itemId = String(item[keyField]);
              return (
                <tr
                  key={itemId}
                  className={`${tableStyles.row} ${rowClassName(item)}`}>
                  {selectable && (
                    <td className={tableStyles.checkboxCell}>
                      <div className="flex items-center">
                        <Input
                          id={`checkbox-table-search-${itemId}`}
                          type="checkbox"
                          checked={selectedItems.includes(itemId)}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onSelectItem?.(itemId, e.target.checked)
                          }
                          className={tableStyles.checkbox}
                        />
                        <label
                          htmlFor={`checkbox-table-search-${itemId}`}
                          className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>
                  )}

                  {columns.map((column) => (
                    <td
                      key={`${itemId}-${column.id}`}
                      className={`${tableStyles.cell} ${column.className || ''}`}>
                      {column.accessor(item)}
                    </td>
                  ))}

                  {actions && actions.length > 0 && (
                    <td className={tableStyles.cell}>
                      <div className="flex space-x-2">
                        {actions
                          .filter(
                            (action) =>
                              !action.condition || action.condition(item),
                          )
                          .map((action, index) => (
                            <Button
                              key={`${itemId}-action-${index}`}
                              onClick={() => action.onClick(item)}
                              className={`${tableStyles.actionButton} ${
                                action.className ||
                                (action.icon === 'trash'
                                  ? tableStyles.actionButtonDanger
                                  : tableStyles.actionButtonPrimary)
                              }`}
                              aria-label={action.label}>
                              <IconWrapper
                                name={action.icon}
                                size={action.iconSize || '18'}
                              />
                            </Button>
                          ))}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
