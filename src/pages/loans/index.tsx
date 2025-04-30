import { useCallback, useState } from 'react';
import { LoanActions } from './components/Loans';
import { LoanFilters } from './components/Loans';
import { LoanTable } from './components/Loans';
import type { Loan } from '../../types/loan';
import { mockloanData } from './data';

/**
 * Loans page component
 *
 * Displays a list of loans with filtering, sorting, and CRUD operations
 */
export default function Loans() {
  // State for selected loans
  const [selectedLoans, setSelectedLoans] = useState<Loan[]>([]);

  // Sample data - would come from API in real implementation
  const [loans] = useState<Loan[]>(mockloanData);
  const totalLoans = loans.length;
  // Handlers for loan actions
  const handleAddLoan = useCallback(() => {
    alert('Add loan functionality will be implemented in the next phase');
  }, []);

  const handleImportLoans = useCallback(() => {
    alert('Import loans functionality will be implemented in the next phase');
  }, []);

  const handleExportLoans = useCallback(() => {
    alert('Export loans functionality will be implemented in the next phase');
  }, []);

  const handleDeleteSelected = useCallback(() => {
    alert(
      `Delete ${selectedLoans.length} selected loans functionality will be implemented in the next phase`,
    );
  }, [selectedLoans]);

  const handleEditLoan = useCallback((loan: Loan) => {
    alert(
      `Edit loan for ${loan.memberName} functionality will be implemented in the next phase`,
    );
  }, []);

  const handleDeleteLoan = useCallback((loan: Loan) => {
    alert(
      `Delete loan for ${loan.memberName} functionality will be implemented in the next phase`,
    );
  }, []);

  const handleViewLoan = useCallback((loan: Loan) => {
    alert(
      `View loan details for ${loan.memberName} functionality will be implemented in the next phase`,
    );
  }, []);

  return (
    <div className="p-4">
      {/* Loan actions (add, import, export, delete) */}
      <LoanActions
        selectedCount={selectedLoans.length}
        onAddLoan={handleAddLoan}
        onImportLoans={handleImportLoans}
        onExportLoans={handleExportLoans}
        onDeleteSelected={handleDeleteSelected}
      />

      {/* Loan filters */}
      <LoanFilters />

      {/* Loan table */}
      <LoanTable
        loans={loans}
        selectedLoans={selectedLoans}
        setSelectedLoans={setSelectedLoans}
        onEditLoan={handleEditLoan}
        onDeleteLoan={handleDeleteLoan}
        onViewLoan={handleViewLoan}
      />

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Showing <span className="font-medium">{totalLoans}</span> of{' '}
          <span className="font-medium">{totalLoans}</span> members
        </div>

        {/*<Pagination totalItems={totalLoans} />*/}
      </div>
    </div>
  );
}
