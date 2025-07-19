import React from 'react';
import {
  OrderFilter as OrderFilterType,
  OrderStatus,
} from '../../../types/order';
import { IconSelect } from '../../../components/Select';
import IconInput from '@/components/Input/IconInput';

const filterPanelClasses =
  'p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800 flex justify-between items-center';

interface OrderFiltersProps {
  filters: OrderFilterType;
  onFilterChange: (filters: Partial<OrderFilterType>) => void;
}

const OrderFilters: React.FC<OrderFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <section className="mb-4">
      <div className={filterPanelClasses}>
        {/* Search filter */}
        <div>
          <IconInput
            name="search"
            iconName="search"
            placeholder="Search for orders"
            type="text"
            value={filters.search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onFilterChange({ search: e.target.value })
            }
            inputClassName="text-input w-4/5 mt-6"
          />
        </div>

        {/* Filter panels */}
        <div className="w-1/3">
          <div>
            <IconSelect
              id="status-filter"
              iconName="userCircle"
              label="Status"
              value={filters.status}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                onFilterChange({
                  status: (e.target.value as OrderStatus) || OrderStatus.All,
                })
              }
              options={[
                { label: 'All Statuses', value: '' },
                { label: 'Active', value: 'active' },
                { label: 'Inactive', value: 'inactive' },
                { label: 'Pending', value: 'pending' },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderFilters;
