import { useState, useCallback, useMemo } from 'react';
import {
  PriceListTable,
  PriceListActions,
  PriceListFilters,
} from './components';
import Pagination from '../../components/Pagination';
import type { PriceListFilter, PriceListSortField } from '@/types/pricelist';
import { useFilterPriceLists } from '@/api/pricelists';
import useDebounce from '@/hooks/useDebounce';
import type { SortConfig } from '@/types';

const DEFAULT_FILTERS: PriceListFilter = {
  search: '',
  status: '',
};

type PriceListSortConfig = SortConfig<PriceListSortField>;

const DEFAULT_SORT: PriceListSortConfig = {
  field: 'name',
  direction: 'asc',
};

export default function PriceLists() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFiltersState] = useState<PriceListFilter>(DEFAULT_FILTERS);
  const [sortConfig, setSortConfig] =
    useState<PriceListSortConfig>(DEFAULT_SORT);
  const debouncedValue = useDebounce(filters.search, 750);
  const [selectedPricelists, setSelectedPricelists] = useState<string[]>([]);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    if (debouncedFilter.search) {
      params.append('search', debouncedFilter.search);
      params.append('search_fields', 'name');
    }
    params.append('page', String(currentPage));
    params.append('preloads', 'PriceListItems');
    return params.toString(); // e.g. size=600X600&page=1
  }, [debouncedFilter, currentPage]);

  const { data, isLoading } = useFilterPriceLists(queryString);

  const handleSort = useCallback(
    (field: PriceListSortField) => {
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

  // Handle priceLists selection
  const handleSelectPricelists = useCallback(
    (id: string, isSelected: boolean) => {
      setSelectedPricelists((prev) => {
        if (isSelected) {
          return [...prev, id];
        } else {
          return prev.filter((priceListId) => priceListId !== id);
        }
      });
    },
    [],
  );

  // Handle select all pricelists
  const handleSelectAll = useCallback(
    (isSelected: boolean) => {
      if (isSelected) {
        setSelectedPricelists(
          data?.price_lists.map((priceLists) => priceLists.id.toString()) ?? [],
        );
      } else {
        setSelectedPricelists([]);
      }
    },
    [data?.price_lists],
  );

  // Set filters with partial updates
  const setFilters = useCallback((newFilters: Partial<PriceListFilter>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  }, []);

  // Placeholder handlers for CRUD operations
  const handleAddPricelist = useCallback(() => {
    alert('Add priceLists functionality will be implemented in the next phase');
  }, []);

  const handleDeleteSelected = useCallback(() => {
    alert(
      `Delete ${selectedPricelists.length} pricelists functionality will be implemented in the next phase`,
    );
    setSelectedPricelists([]);
  }, [selectedPricelists]);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="p-4">
      {/* PriceList actions (add, import, export, delete) */}
      <PriceListActions
        selectedCount={selectedPricelists.length}
        onAddPriceList={handleAddPricelist}
        onDeleteSelected={handleDeleteSelected}
      />

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
        {/* Filters */}
        <PriceListFilters filters={filters} onFilterChange={setFilters} />

        {/* PriceList table */}
        <PriceListTable
          pricelists={data?.price_lists ?? []}
          sortConfig={sortConfig}
          onSort={handleSort}
          selectedPricelists={selectedPricelists}
          onSelectPricelist={handleSelectPricelists}
          onSelectAll={handleSelectAll}
        />

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            Showing{' '}
            <span className="font-medium">{data?.price_lists.length}</span> of{' '}
            <span className="font-medium">{data?.total}</span> pricelists
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={data?.totalPages ?? 0}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
