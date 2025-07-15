import type { Status } from '@/types';
import type { TableColumn } from '@/components/Table';
import type { PriceList, PriceListSortField } from '@/types/pricelist';
import IconWrapper from '@/components/IconWrapper/IconWrapper';
import Button from '@/components/Button/Button';
import { getStatusColor } from '@/utils/getStatusColor';
import PriceListItemViewDialog from '../components/PriceListItemViewDialog';
import { useMemo } from 'react';

interface ColumnProps {
  onEditPriceList: (pricelist: PriceList) => void;
}

const useGetTableColumns = ({ onEditPriceList }: ColumnProps) => {
  return useMemo(
    () =>
      [
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
            <>
              <PriceListItemViewDialog
                priceListItems={pricelist.priceListItems}
              />
              <Button
                onClick={() => onEditPriceList(pricelist)}
                className="ml-2 cursor-pointer"
                aria-label={`Edit ${pricelist.name}'s pricelist`}>
                <IconWrapper name="edit" size="20" />
              </Button>
            </>
          ),
        },
      ] as TableColumn<PriceList, PriceListSortField>[],
    [onEditPriceList],
  );
};

export default useGetTableColumns;
