import React from 'react';
import {
  MemberFilters as MemberFiltersType,
  MemberStatus,
  MembershipType,
} from '../../../types/member';
import IconWrapper from '../../../components/IconWrapper/IconWrapper';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import { IconSelect } from '../../../components/Select';

// Common class constants for consistent styling
const filterButtonClasses =
  'inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700';
const resetButtonClasses =
  'text-white bg-primary hover:bg-primary-600 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800';
const filterPanelClasses =
  'p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800';

interface MemberFiltersProps {
  filters: MemberFiltersType;
  onFilterChange: (filters: Partial<MemberFiltersType>) => void;
  onResetFilters: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

const MemberFilters: React.FC<MemberFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  isOpen,
  onToggle,
}) => {
  return (
    <section className="mb-4">
      <div className="flex items-center justify-between pb-4">
        <Button
          className={filterButtonClasses}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}>
          <IconWrapper name="filter" size="18" className="mr-2" />
          Filter
          <IconWrapper
            name={isOpen ? 'chevronUp' : 'chevronDown'}
            size="16"
            className="ml-1"
          />
        </Button>

        <div className="relative w-80">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <IconWrapper
              name="search"
              size="20"
              className="text-gray-500 dark:text-gray-400"
            />
          </div>
          <Input
            type="text"
            id="table-search"
            value={filters.search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onFilterChange({ search: e.target.value })
            }
            className="w-full"
            placeholder="Search for members"
          />
        </div>
      </div>

      {/* Filter panels */}
      {isOpen && (
        <div className={filterPanelClasses}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <IconSelect
                id="status-filter"
                iconName="userCircle"
                label="Status"
                value={filters.status}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  onFilterChange({
                    status: e.target.value as MemberStatus | 'all',
                  })
                }
                options={[
                  { label: 'All Statuses', value: 'all' },
                  { label: 'Active', value: 'active' },
                  { label: 'Inactive', value: 'inactive' },
                  { label: 'Pending', value: 'pending' },
                ]}
              />
            </div>

            <div>
              <IconSelect
                id="membership-filter"
                iconName="collection"
                label="Membership Type"
                value={filters.membershipType}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  onFilterChange({
                    membershipType: e.target.value as MembershipType | 'all',
                  })
                }
                options={[
                  { label: 'All Types', value: 'all' },
                  { label: 'Regular', value: 'regular' },
                  { label: 'Premium', value: 'premium' },
                  { label: 'Lifetime', value: 'lifetime' },
                ]}
              />
            </div>

            <div className="flex items-end">
              <Button
                type="button"
                onClick={onResetFilters}
                className={resetButtonClasses}>
                Reset Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MemberFilters;
