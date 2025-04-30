import { memo } from 'react';
import IconWrapper from '../../../../components/IconWrapper/IconWrapper';
import type { Loan } from '../../../../types/loan';

/**
 * Props for the LoanTable component
 */
type LoanTableProps = {
  loans: Loan[];
  selectedLoans: Loan[];
  setSelectedLoans: React.Dispatch<React.SetStateAction<Loan[]>>;
  onEditLoan: (loan: Loan) => void;
  onDeleteLoan: (loan: Loan) => void;
  onViewLoan: (loan: Loan) => void;
};

/**
 * Format currency amount
 */
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Format date string
 */
const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString();
};

/**
 * Get status badge classes based on loan status
 */
const getStatusBadgeClasses = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    case 'approved':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'active':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    case 'completed':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    case 'rejected':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'defaulted':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

/**
 * Loan table component
 *
 * Displays a table of loans with selection, sorting, and action buttons
 */
const LoanTable = memo(
  ({
    loans,
    selectedLoans,
    setSelectedLoans,
    onEditLoan,
    onDeleteLoan,
    onViewLoan,
  }: LoanTableProps) => {
    // Handle select all checkbox
    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setSelectedLoans([...loans]);
      } else {
        setSelectedLoans([]);
      }
    };

    // Handle individual loan selection
    const handleSelectLoan = (
      e: React.ChangeEvent<HTMLInputElement>,
      loan: Loan,
    ) => {
      if (e.target.checked) {
        setSelectedLoans([...selectedLoans, loan]);
      } else {
        setSelectedLoans(selectedLoans.filter((m) => m.id !== loan.id));
      }
    };

    // Check if a loan is selected
    const isLoanSelected = (loanId: string): boolean => {
      return selectedLoans.some((loan) => loan.id === loanId);
    };

    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all"
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    checked={
                      selectedLoans.length === loans.length && loans.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                  <label htmlFor="checkbox-all" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Member
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Purpose
              </th>
              <th scope="col" className="px-6 py-3">
                Term
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Disbursement Date
              </th>
              <th scope="col" className="px-6 py-3">
                Next Payment
              </th>
              <th scope="col" className="px-6 py-3">
                Balance
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr
                key={loan.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id={`checkbox-loan-${loan.id}`}
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      checked={isLoanSelected(loan.id)}
                      onChange={(e) => handleSelectLoan(e, loan)}
                    />
                    <label
                      htmlFor={`checkbox-loan-${loan.id}`}
                      className="sr-only">
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {loan.memberName}
                </th>
                <td className="px-6 py-4">{formatCurrency(loan.amount)}</td>
                <td className="px-6 py-4">{loan.purpose}</td>
                <td className="px-6 py-4">{loan.term} months</td>
                <td className="px-6 py-4">
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded ${getStatusBadgeClasses(
                      loan.status,
                    )}`}>
                    {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {formatDate(loan.disbursementDate)}
                </td>
                <td className="px-6 py-4">
                  {formatDate(loan.nextPaymentDate)}
                </td>
                <td className="px-6 py-4">
                  {formatCurrency(loan.remainingBalance)}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => onViewLoan(loan)}
                      className="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                      aria-label={`View ${loan.memberName}'s loan details`}>
                      <IconWrapper name="eye" size="20" />
                    </button>
                    <button
                      onClick={() => onEditLoan(loan)}
                      className="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                      aria-label={`Edit ${loan.memberName}'s loan`}>
                      <IconWrapper name="edit" size="20" />
                    </button>
                    <button
                      onClick={() => onDeleteLoan(loan)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      aria-label={`Delete ${loan.memberName}'s loan`}>
                      <IconWrapper name="trash" size="20" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {loans.length === 0 && (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td colSpan={10} className="px-6 py-4 text-center">
                  No loans found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  },
);

export default LoanTable;
