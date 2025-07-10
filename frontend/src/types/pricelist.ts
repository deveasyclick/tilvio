import type { APIResponse, FilterResponse } from '.';
import type { Distributor } from './distributor';
import type { Workspace } from './workspace';

export type PriceListStatus = 'active' | 'inactive' | 'pending' | (string & {});
export type PriceListResponse = FilterResponse<{
  price_lists: PriceList[];
}>;

export type FilterPriceListResponse = APIResponse<PriceListResponse>;

export type PriceListItem = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  price: number;
  dimension: string;
  description: string;
  priceListId: number;
  workspaceId: number;
  workspace?: Workspace;
};

export type PriceList = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  name: string;
  status: PriceListStatus;
  createdById: number;
  createdBy?: Distributor;
  workspaceId: number;
  workspace?: Workspace;
  priceListItems: PriceListItem[];
};

export interface PriceListFilter {
  search: string;
  status: PriceListStatus;
}

export type PriceListSortField = 'name' | 'status' | string;
