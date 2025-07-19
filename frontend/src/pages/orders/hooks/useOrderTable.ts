import { useFetchAuthenticatedDistributor } from '@/api/distributor';
import { useDeleteOrders, useFilterOrders } from '@/api/order';
import { useErrorToast } from '@/hooks';
import useDebounce from '@/hooks/useDebounce';
import type { SortConfig } from '@/types';
import {
  OrderStatus,
  type OrderFilter,
  type OrderSortField,
} from '@/types/order';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';

const DEFAULT_FILTERS: OrderFilter = {
  search: '',
  status: OrderStatus.All,
};

type OrderSortConfig = SortConfig<OrderSortField>;

const DEFAULT_SORT: OrderSortConfig = {
  field: 'name',
  direction: 'asc',
};

const useCreateOrder = () => {
  const { data: distributor } = useFetchAuthenticatedDistributor();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [filters, setFiltersState] = useState<OrderFilter>(DEFAULT_FILTERS);
  const [sortConfig, setSortConfig] = useState<OrderSortConfig>(DEFAULT_SORT);
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
    params.append('preloads', 'OrderItems');
    params.append('sort', 'created_at desc');
    if (distributor?.workspaceId)
      params.append('workspace_id', distributor?.workspaceId.toString());
    return params.toString(); // e.g. size=600X600&page=1
  }, [debouncedFilter, currentPage, distributor?.workspaceId]);

  const { data, isLoading } = useFilterOrders(queryString);
  const { mutate: deleteOrders } = useDeleteOrders();
  const handleSort = (field: OrderSortField) => {
    setSortConfig({
      field,
      direction:
        sortConfig.field === field && sortConfig.direction === 'asc'
          ? 'desc'
          : 'asc',
    });
  };

  // Handle order selection
  const handleSelectOrders = (id: string, isSelected: boolean) => {
    setSelectedOrders((prev) => {
      if (isSelected) {
        return [...prev, id];
      } else {
        return prev.filter((orderId) => orderId !== id);
      }
    });
  };

  // Handle select all orders
  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedOrders(
        data?.price_lists.map((order) => order.id.toString()) ?? [],
      );
    } else {
      setSelectedOrders([]);
    }
  };

  // Set filters with partial updates
  const setFilters = (newFilters: Partial<OrderFilter>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleDeleteSelected = async () => {
    try {
      await deleteOrders(
        selectedOrders.map((id) => Number(id)),
        {
          onSuccess: () => {
            toast.success('Orders deleted successfully!');
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            setSelectedOrders([]);
          },
          onError: (err) => {
            console.error('Error deleting orders:', err);
            errorToast({
              title: `Error deleting orders`,
              description: `${err.message}`,
            });
          },
        },
      );
    } catch (err) {
      console.error('Error deleting orders:', err);
      errorToast({
        title: 'Error deleting orders',
        description: 'Error deleting orders',
      });
    }
  };

  return {
    currentPage,
    setCurrentPage,
    filters,
    setFilters,
    handleSelectAll,
    handleSelectOrders,
    handleSort,
    handleDeleteSelected,
    sortConfig,
    orders: data?.price_lists ?? [],
    selectedOrders,
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    isLoading,
  };
};

export default useCreateOrder;
