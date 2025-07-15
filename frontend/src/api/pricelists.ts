import { useMutation, useQuery } from '@tanstack/react-query';
import { useFetchWithAuth } from '../hooks/fetch';
import { getConfig } from '../config';
import { HTTP_METHODS } from '../types/http';
import type {
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

export const useDeletePriceLists = () => {
  const { fetchWithAuth } = useFetchWithAuth();

  return useMutation({
    mutationFn: (priceListIds: number[]) =>
      fetchWithAuth(`${API_URL}/delete/bulk`, {
        method: 'POST',
        body: JSON.stringify({ ids: priceListIds }),
      }),
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

export const useEditPriceList = () => {
  const { fetchWithAuth } = useFetchWithAuth();

  return useMutation({
    mutationFn: (priceList: Partial<PriceList>) =>
      fetchWithAuth<Partial<PriceList>>(`${API_URL}/${priceList.id}`, {
        method: 'PUT',
        body: JSON.stringify(priceList),
      }),
  });
};
