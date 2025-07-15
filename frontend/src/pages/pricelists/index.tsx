import {
  PriceListTable,
  PriceListActions,
  PriceListFilters,
  CreateOrEditPriceListDialog,
} from './components';
import Pagination from '../../components/Pagination';

import { FormProvider } from 'react-hook-form';
import { useCreateOrEditPricelist, usePriceListTable } from './hooks';
import { TableLoader } from '@/components/Loaders';

export default function PriceLists() {
  const {
    currentPage,
    setCurrentPage,
    filters,
    setFilters,
    handleSelectAll,
    handleSelectPricelists,
    handleSort,
    handleDeleteSelected,
    pricelists,
    sortConfig,
    selectedPricelists,
    total,
    totalPages,
    isLoading,
  } = usePriceListTable();

  const {
    handleAddOrEditPricelist,
    createPricelistDialogOpen,
    mutationStatus,
    createOrEditPricelistForm,
    mode,
    onEditPricelist,
    onAddPricelist,
    handleDialogToggle,
  } = useCreateOrEditPricelist();

  return (
    <div className="p-4">
      {/* PriceList actions (add, import, export, delete) */}
      <PriceListActions
        selectedCount={selectedPricelists.length}
        onDeleteSelected={handleDeleteSelected}
        onAddPriceList={onAddPricelist}
      />

      <FormProvider {...createOrEditPricelistForm}>
        <CreateOrEditPriceListDialog
          handleAddOrEditPriceList={handleAddOrEditPricelist}
          open={createPricelistDialogOpen}
          onOpenDialog={handleDialogToggle}
          status={mutationStatus}
          mode={mode}
        />
      </FormProvider>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
        {/* Filters */}
        <PriceListFilters filters={filters} onFilterChange={setFilters} />

        {/* PriceList table */}
        {isLoading ? (
          <TableLoader />
        ) : (
          <PriceListTable
            pricelists={pricelists}
            sortConfig={sortConfig}
            onSort={handleSort}
            selectedPricelists={selectedPricelists}
            onSelectPricelist={handleSelectPricelists}
            onSelectAll={handleSelectAll}
            onEditPriceList={onEditPricelist}
          />
        )}

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing <span className="font-medium">{pricelists.length}</span> of{' '}
            <span className="font-medium">{total}</span> pricelists
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
