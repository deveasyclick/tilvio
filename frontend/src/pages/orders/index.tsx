import { OrderTable, OrderActions, OrderFilters } from './components';
import Pagination from '../../components/Pagination';

import { useCreateOrEditOrder, useOrderTable } from './hooks';
import { TableLoader } from '@/components/Loaders';

export default function Orders() {
  const {
    currentPage,
    setCurrentPage,
    filters,
    setFilters,
    handleSelectAll,
    handleSelectOrders,
    handleSort,
    handleDeleteSelected,
    orders,
    sortConfig,
    selectedOrders,
    total,
    totalPages,
    isLoading,
  } = useOrderTable();

  const { onEditOrder, onAddOrder } = useCreateOrEditOrder();

  return (
    <div className="p-4">
      {/* Order actions (add, import, export, delete) */}
      <OrderActions
        selectedCount={selectedOrders.length}
        onDeleteSelected={handleDeleteSelected}
        onAddOrder={onAddOrder}
      />

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
        {/* Filters */}
        <OrderFilters filters={filters} onFilterChange={setFilters} />

        {/* Order table */}
        {isLoading ? (
          <TableLoader />
        ) : (
          <OrderTable
            orders={orders}
            sortConfig={sortConfig}
            onSort={handleSort}
            selectedOrders={selectedOrders}
            onSelectOrder={handleSelectOrders}
            onSelectAll={handleSelectAll}
            onEditOrder={onEditOrder}
          />
        )}

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing <span className="font-medium">{Orders.length}</span> of{' '}
            <span className="font-medium">{total}</span> Orders
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
