import type { Status } from '@/types';
import type { TableColumn } from '@/components/Table';
import type { Order, OrderSortField } from '@/types/order';
import IconWrapper from '@/components/IconWrapper/IconWrapper';
import Button from '@/components/Button/Button';
import { getStatusColor } from '@/utils/getStatusColor';
import OrderItemViewDialog from '../components/OrderItemViewDialog';
import { useMemo } from 'react';

interface ColumnProps {
  onEditOrder: (order: Order) => void;
}

const useGetTableColumns = ({ onEditOrder }: ColumnProps) => {
  return useMemo(
    () =>
      [
        {
          id: 'name',
          header: 'Name',
          sortable: true,
          accessor: (order) => order.name,
        },
        {
          id: 'status',
          header: 'Status',
          sortable: true,
          accessor: (order) => (
            <div className="flex items-center">
              <div
                className={`h-2.5 w-2.5 rounded-full ${getStatusColor(order.status as Status)} mr-2`}></div>
              <span className="capitalize">{order.status}</span>
            </div>
          ),
        },
        {
          id: 'orderItems',
          header: 'Price Lists',
          sortable: false,
          accessor: (order) => (
            <>
              <OrderItemViewDialog orderItems={order.orderItems} />
              <Button
                onClick={() => onEditOrder(order)}
                className="ml-2 cursor-pointer"
                aria-label={`Edit ${order.name}'s order`}>
                <IconWrapper name="edit" size="20" />
              </Button>
            </>
          ),
        },
      ] as TableColumn<Order, OrderSortField>[],
    [onEditOrder],
  );
};

export default useGetTableColumns;
