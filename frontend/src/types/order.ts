import type { APIResponse, FilterResponse } from '.';
import type { Distributor } from './distributor';
import type { Tile } from './tile';
import type { Workspace } from './workspace';

export enum OrderStatus {
  Pending = 'pending',
  Approved = 'approved',
  Delivered = 'delivered',
  Cancelled = 'cancelled',
  All = '',
}

export enum DeliveryStatus {
  Pending = 'pending',
  InTransit = 'in-transit',
  Delivered = 'delivered',
  Cancelled = 'cancelled',
}

export type OrderResponse = FilterResponse<{
  price_lists: Order[];
}>;

export type FilterOrderResponse = APIResponse<OrderResponse>;

export type BulkDeleteOrderResponse = APIResponse<{
  ids: string[];
}>;

export type OrderItem = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  orderId: number;
  unitPrice: number;
  totalPrice: number;
  tileId: number;
  tile: Tile;
  quantity: number;
  weight: number;
  totalWeight: number;
  distributorId: number;
  createdBy: Distributor;
  workspaceId: number;
  workspace: Workspace;
};

export type Order = {
  distributorId: number;
  createdBy: Distributor;
  customerId: number;
  status: OrderStatus;
  totalPrice: number;
  totalWeight: number;
  transportFare: number;
  workspaceId: number;
  workspace: Workspace;
  orderItems: OrderItem[];
  deliveryAddress: string;
  deliveredAt?: string; // ISO timestamp string
  deliveryStatus: DeliveryStatus;
  notes: string;
  discount: number;
  title: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export interface OrderFilter {
  search: string;
  status: OrderStatus;
}

export type OrderSortField = 'name' | 'status' | string;
