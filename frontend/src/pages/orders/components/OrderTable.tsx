import Table from '../../../components/Table';
import type { Order, OrderSortField } from '@/types/order';
import type { SortConfig } from '@/types';
import { useGetTableColumns } from '../hooks';

interface OrderTableProps {
  orders: Order[];
  sortConfig: SortConfig<OrderSortField>;
  onSort: (field: OrderSortField) => void;
  selectedOrders: string[];
  onSelectOrder: (id: string, isSelected: boolean) => void;
  onSelectAll: (isSelected: boolean) => void;
  onEditOrder: (order: Order) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({
  orders,
  sortConfig,
  onSort,
  selectedOrders,
  onSelectOrder,
  onSelectAll,
  onEditOrder,
}) => {
  const columns = useGetTableColumns({ onEditOrder });
  return (
    <Table
      data={orders}
      columns={columns}
      keyField="id"
      sortConfig={sortConfig}
      onSort={onSort}
      selectable={true}
      selectedItems={selectedOrders}
      onSelectItem={onSelectOrder}
      onSelectAll={onSelectAll}
      emptyMessage="No orders found"
    />
  );
};

export default OrderTable;
