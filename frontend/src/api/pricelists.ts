import { useQuery } from '@tanstack/react-query';
import { useFetchWithAuth } from '../hooks/fetch';
import { getConfig } from '../config';
import { HTTP_METHODS } from '../types/http';
import type {
  FilterPriceListResponse,
  PriceListResponse,
} from '@/types/pricelist';

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
