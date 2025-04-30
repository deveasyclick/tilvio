import { memo } from 'react';
import Button from '../../../../components/Button/Button';
import IconWrapper from '../../../../components/IconWrapper/IconWrapper';

/**
 * Props for the LoanActions component
 */
type LoanActionsProps = {
  selectedCount: number;
  onAddLoan: () => void;
  onImportLoans: () => void;
  onExportLoans: () => void;
  onDeleteSelected: () => void;
};

/**
 * Loan actions component
 *
 * Provides buttons for common loan management actions
 */
const LoanActions = memo(
  ({
    selectedCount,
    onAddLoan,
    onImportLoans,
    onExportLoans,
    onDeleteSelected,
  }: LoanActionsProps) => {
    return (
      <div className="flex flex-wrap items-center justify-between mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mr-4">
            Loans
          </h2>
          <div className="flex space-x-2">
            <Button
              onClick={onAddLoan}
              className="flex items-center text-white bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
              <IconWrapper name="plus" className="mr-2" size="16" />
              Add Loan
            </Button>
            <Button
              onClick={onImportLoans}
              className="flex items-center text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 focus:outline-none dark:focus:ring-gray-700">
              <IconWrapper name="upload" className="mr-2" size="16" />
              Import
            </Button>
            <Button
              onClick={onExportLoans}
              className="flex items-center text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 focus:outline-none dark:focus:ring-gray-700">
              <IconWrapper name="download" className="mr-2" size="16" />
              Export
            </Button>
          </div>
        </div>

        {selectedCount > 0 && (
          <Button
            onClick={onDeleteSelected}
            className="flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
            <IconWrapper name="trash" className="mr-2" size="16" />
            Delete Selected ({selectedCount})
          </Button>
        )}
      </div>
    );
  },
);

export default LoanActions;
