import { useMutation, useQuery } from '@tanstack/react-query';
import { useFetchWithAuth } from '../hooks/fetch';
import { getConfig } from '../config';
import { HTTP_METHODS } from '../types/http';
import type { FilterOrderResponse, Order, OrderResponse } from '@/types/order';
import type { CreateOrder } from '@/schemas/order';

const API_URL = `${getConfig('apiBaseUrl')}/orders`;

export const useFilterOrders = (filter: string) => {
  const { fetchWithAuth } = useFetchWithAuth();

  return useQuery<FilterOrderResponse, Error, OrderResponse>({
    queryKey: ['orders', filter],
    queryFn: () =>
      fetchWithAuth<FilterOrderResponse>(`${API_URL}/filter?${filter}`, {
        method: HTTP_METHODS.GET,
      }),
    select: (response) => response.data ?? [],
  });
};

export const useDeleteOrders = () => {
  const { fetchWithAuth } = useFetchWithAuth();

  return useMutation({
    mutationFn: (orderIds: number[]) =>
      fetchWithAuth(`${API_URL}/delete/bulk`, {
        method: 'POST',
        body: JSON.stringify({ ids: orderIds }),
      }),
  });
};

export const useAddOrder = () => {
  const { fetchWithAuth } = useFetchWithAuth();

  return useMutation({
    mutationFn: (order: Partial<CreateOrder>) =>
      fetchWithAuth<CreateOrder>(API_URL, {
        method: 'POST',
        body: JSON.stringify(order),
      }),
  });
};

export const useEditOrder = () => {
  const { fetchWithAuth } = useFetchWithAuth();

  return useMutation({
    mutationFn: (order: Partial<Order>) =>
      fetchWithAuth<Partial<Order>>(`${API_URL}/${order.id}`, {
        method: 'PUT',
        body: JSON.stringify(order),
      }),
  });
};
