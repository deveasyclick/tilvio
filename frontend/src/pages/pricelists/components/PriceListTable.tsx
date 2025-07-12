import { getStatusColor } from '../../../utils/getStatusColor';
import Table from '../../../components/Table';
import type { TableColumn } from '../../../components/Table/types';
import type { PriceList, PriceListSortField } from '@/types/pricelist';
import type { SortConfig, Status } from '@/types';
import PriceListItemViewDialog from './PriceListItemViewDialog';

interface PriceListTableProps {
  pricelists: PriceList[];
  sortConfig: SortConfig<PriceListSortField>;
  onSort: (field: PriceListSortField) => void;
  selectedPricelists: string[];
  onSelectPricelist: (id: string, isSelected: boolean) => void;
  onSelectAll: (isSelected: boolean) => void;
}

const columns: TableColumn<PriceList, PriceListSortField>[] = [
  {
    id: 'name',
    header: 'Name',
    sortable: true,
    accessor: (pricelist) => pricelist.name,
  },
  {
    id: 'status',
    header: 'Status',
    sortable: true,
    accessor: (pricelist) => (
      <div className="flex items-center">
        <div
          className={`h-2.5 w-2.5 rounded-full ${getStatusColor(pricelist.status as Status)} mr-2`}></div>
        <span className="capitalize">{pricelist.status}</span>
      </div>
    ),
  },
  {
    id: 'priceListItems',
    header: 'Price Lists',
    sortable: false,
    accessor: (pricelist) => (
      <PriceListItemViewDialog priceListItems={pricelist.priceListItems} />
    ),
  },
];

const PriceListTable: React.FC<PriceListTableProps> = ({
  pricelists,
  sortConfig,
  onSort,
  selectedPricelists,
  onSelectPricelist,
  onSelectAll,
}) => {
  return (
    <Table
      data={pricelists}
      columns={columns}
      keyField="id"
      sortConfig={sortConfig}
      onSort={onSort}
      selectable={true}
      selectedItems={selectedPricelists}
      onSelectItem={onSelectPricelist}
      onSelectAll={onSelectAll}
      emptyMessage="No members found"
    />
  );
};

export default PriceListTable;
