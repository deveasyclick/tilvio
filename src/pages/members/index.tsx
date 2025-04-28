import { useState, useCallback } from 'react';
import { Member, SortField } from '../../types/member';
import { useMembers } from '../../hooks/useMembers';
import { MemberTable, MemberFilters, MemberActions } from './components';
import Pagination from '../../components/Pagination';
import useToggleState from '../../hooks/useToggleState';

export default function Members() {
  // State for selected members
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  // Toggle state for filters visibility
  const [isFiltersOpen, toggleFilters] = useToggleState(false);

  // Use our custom hook for member data, filtering, and pagination
  const {
    filteredMembers,
    totalMembers,
    currentPage,
    totalPages,
    filters,
    sortConfig,
    setCurrentPage,
    setFilters,
    setSortConfig,
    resetFilters,
  } = useMembers();

  // Handle sorting when a column header is clicked
  const handleSort = useCallback(
    (field: SortField) => {
      setSortConfig({
        field,
        direction:
          sortConfig.field === field && sortConfig.direction === 'asc'
            ? 'desc'
            : 'asc',
      });
    },
    [setSortConfig, sortConfig],
  );

  // Handle member selection
  const handleSelectMember = useCallback((id: string, isSelected: boolean) => {
    setSelectedMembers((prev) => {
      if (isSelected) {
        return [...prev, id];
      } else {
        return prev.filter((memberId) => memberId !== id);
      }
    });
  }, []);

  // Handle select all members
  const handleSelectAll = useCallback(
    (isSelected: boolean) => {
      if (isSelected) {
        setSelectedMembers(filteredMembers.map((member) => member.id));
      } else {
        setSelectedMembers([]);
      }
    },
    [filteredMembers],
  );

  // Placeholder handlers for CRUD operations
  const handleAddMember = useCallback(() => {
    alert('Add member functionality will be implemented in the next phase');
  }, []);

  const handleImportMembers = useCallback(() => {
    alert('Import members functionality will be implemented in the next phase');
  }, []);

  const handleExportMembers = useCallback(() => {
    alert('Export members functionality will be implemented in the next phase');
  }, []);

  const handleDeleteSelected = useCallback(() => {
    alert(
      `Delete ${selectedMembers.length} members functionality will be implemented in the next phase`,
    );
    setSelectedMembers([]);
  }, [selectedMembers]);

  const handleViewMember = useCallback((member: Member) => {
    alert(
      `View member ${member.firstName} ${member.lastName} functionality will be implemented in the next phase`,
    );
  }, []);

  const handleEditMember = useCallback((member: Member) => {
    alert(
      `Edit member ${member.firstName} ${member.lastName} functionality will be implemented in the next phase`,
    );
  }, []);

  const handleDeleteMember = useCallback((member: Member) => {
    alert(
      `Delete member ${member.firstName} ${member.lastName} functionality will be implemented in the next phase`,
    );
  }, []);

  return (
    <div className="p-4">
      {/* Member actions (add, import, export, delete) */}
      <MemberActions
        selectedCount={selectedMembers.length}
        onAddMember={handleAddMember}
        onImportMembers={handleImportMembers}
        onExportMembers={handleExportMembers}
        onDeleteSelected={handleDeleteSelected}
      />

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
        {/* Filters */}
        <MemberFilters
          filters={filters}
          onFilterChange={setFilters}
          onResetFilters={resetFilters}
          isOpen={isFiltersOpen}
          onToggle={toggleFilters}
        />

        {/* Member table */}
        <MemberTable
          members={filteredMembers}
          sortConfig={sortConfig}
          onSort={handleSort}
          onEdit={handleEditMember}
          onView={handleViewMember}
          onDelete={handleDeleteMember}
          selectedMembers={selectedMembers}
          onSelectMember={handleSelectMember}
          onSelectAll={handleSelectAll}
        />

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing{' '}
            <span className="font-medium">{filteredMembers.length}</span> of{' '}
            <span className="font-medium">{totalMembers}</span> members
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
