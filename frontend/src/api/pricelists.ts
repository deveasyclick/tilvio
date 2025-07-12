import { useMutation, useQuery } from '@tanstack/react-query';
import { useFetchWithAuth } from '../hooks/fetch';
import { getConfig } from '../config';
import { HTTP_METHODS } from '../types/http';
import type {
  BulkDeletePriceListResponse,
  FilterPriceListResponse,
  PriceList,
  PriceListResponse,
} from '@/types/pricelist';
import type { CreatePriceList } from '@/schemas/pricelists';

const API_URL = `${getConfig('apiBaseUrl')}/pricelists`;

export const useFilterPriceLists = (filter: string) => {
  const { fetchWithAuth } = useFetchWithAuth();

  return useQuery<FilterPriceListResponse, Error, PriceListResponse>({
    queryKey: ['pricelists', filter],
    queryFn: () =>
      fetchWithAuth<FilterPriceListResponse>(`${API_URL}/filter?${filter}`, {
        method: HTTP_METHODS.GET,
      }),
    select: (response) => response.data ?? [],
  });
};

export const useDeletePriceLists = (priceListIds: PriceList[]) => {
  const { fetchWithAuth } = useFetchWithAuth();

  return useQuery<
    BulkDeletePriceListResponse,
    Error,
    BulkDeletePriceListResponse['data']
  >({
    queryKey: ['pricelists', priceListIds],
    queryFn: () =>
      fetchWithAuth<BulkDeletePriceListResponse>(`${API_URL}`, {
        method: HTTP_METHODS.DELETE,
        body: JSON.stringify({ ids: priceListIds }),
      }),
    select: (response) => response.data ?? [],
  });
};

export const useAddPriceList = () => {
  const { fetchWithAuth } = useFetchWithAuth();

  return useMutation({
    mutationFn: (priceList: Partial<CreatePriceList>) =>
      fetchWithAuth<CreatePriceList>(API_URL, {
        method: 'POST',
        body: JSON.stringify(priceList),
      }),
  });
};
