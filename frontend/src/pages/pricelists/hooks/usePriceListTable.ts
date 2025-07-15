import { useDeletePriceLists, useFilterPriceLists } from '@/api/pricelists';
import { useErrorToast } from '@/hooks';
import useDebounce from '@/hooks/useDebounce';
import type { SortConfig } from '@/types';
import type { PriceListFilter, PriceListSortField } from '@/types/pricelist';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

const DEFAULT_FILTERS: PriceListFilter = {
  search: '',
  status: '',
};

type PriceListSortConfig = SortConfig<PriceListSortField>;

const DEFAULT_SORT: PriceListSortConfig = {
  field: 'name',
  direction: 'asc',
};

const useCreatePricelist = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPricelists, setSelectedPricelists] = useState<string[]>([]);
  const [filters, setFiltersState] = useState<PriceListFilter>(DEFAULT_FILTERS);
  const [sortConfig, setSortConfig] =
    useState<PriceListSortConfig>(DEFAULT_SORT);
  const debouncedFilter = useDebounce(filters, 750);
  const errorToast = useErrorToast();
  const queryClient = useQueryClient();
  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    if (debouncedFilter.search) {
      params.append('search', debouncedFilter.search);
      params.append('search_fields', 'name');
    }
    if (debouncedFilter.status) params.append('status', debouncedFilter.status);
    params.append('page', String(currentPage));
    params.append('preloads', 'PriceListItems');
    params.append('sort', 'created_at desc');
    return params.toString(); // e.g. size=600X600&page=1
  }, [debouncedFilter, currentPage]);

  const { data, isLoading } = useFilterPriceLists(queryString);
  const { mutate: deletePricelists } = useDeletePriceLists();
  const handleSort = (field: PriceListSortField) => {
    setSortConfig({
      field,
      direction:
        sortConfig.field === field && sortConfig.direction === 'asc'
          ? 'desc'
          : 'asc',
    });
  };

  // Handle priceLists selection
  const handleSelectPricelists = (id: string, isSelected: boolean) => {
    setSelectedPricelists((prev) => {
      if (isSelected) {
        return [...prev, id];
      } else {
        return prev.filter((priceListId) => priceListId !== id);
      }
    });
  };

  // Handle select all pricelists
  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedPricelists(
        data?.price_lists.map((priceLists) => priceLists.id.toString()) ?? [],
      );
    } else {
      setSelectedPricelists([]);
    }
  };

  // Set filters with partial updates
  const setFilters = (newFilters: Partial<PriceListFilter>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleDeleteSelected = async () => {
    try {
      await deletePricelists(
        selectedPricelists.map((id) => Number(id)),
        {
          onSuccess: () => {
            toast.success('Pricelists deleted successfully!');
            queryClient.invalidateQueries({ queryKey: ['pricelists'] });
            setSelectedPricelists([]);
          },
          onError: (err) => {
            console.error('Error deleting pricelists:', err);
            errorToast({
              title: `Error deleting pricelists`,
              description: `${err.message}`,
            });
          },
        },
      );
    } catch (err) {
      console.error('Error deleting pricelists:', err);
      errorToast({
        title: 'Error deleting pricelists',
        description: 'Error deleting pricelists',
      });
    }
  };

  return {
    currentPage,
    setCurrentPage,
    filters,
    setFilters,
    handleSelectAll,
    handleSelectPricelists,
    handleSort,
    handleDeleteSelected,
    sortConfig,
    pricelists: data?.price_lists ?? [],
    selectedPricelists,
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    isLoading,
  };
};

export default useCreatePricelist;
