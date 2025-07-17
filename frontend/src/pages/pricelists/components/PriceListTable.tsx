import Table from '../../../components/Table';
import type { PriceList, PriceListSortField } from '@/types/pricelist';
import type { SortConfig } from '@/types';
import { useGetTableColumns } from '../hooks';

interface PriceListTableProps {
  pricelists: PriceList[];
  sortConfig: SortConfig<PriceListSortField>;
  onSort: (field: PriceListSortField) => void;
  selectedPricelists: string[];
  onSelectPricelist: (id: string, isSelected: boolean) => void;
  onSelectAll: (isSelected: boolean) => void;
  onEditPriceList: (pricelist: PriceList) => void;
}

const PriceListTable: React.FC<PriceListTableProps> = ({
  pricelists,
  sortConfig,
  onSort,
  selectedPricelists,
  onSelectPricelist,
  onSelectAll,
  onEditPriceList,
}) => {
  const columns = useGetTableColumns({ onEditPriceList });
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
      emptyMessage="No pricelists found"
    />
  );
};

export default PriceListTable;
