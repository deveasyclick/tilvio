import React, { useMemo } from 'react';
import IconWrapper from '../../../components/IconWrapper/IconWrapper';
import Button from '../../../components/Button/Button';
import Input from '../../../components/Input/Input';
import { IconSelect } from '../../../components/Select';
import type {
  TileDimension,
  TileFilters,
  TileManufacturer,
  TileType,
} from '@/types/tile';
import type { Manufacturer } from '@/types/manufacturer';

// Common class constants for consistent styling
const filterButtonClasses =
  'inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700 cursor-pointer';
const resetButtonClasses =
  'text-white bg-primary hover:bg-primary-600 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 cursor-pointer';
const filterPanelClasses =
  'p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800';

interface MemberFiltersProps {
  filters: TileFilters;
  onFilterChange: (filters: Partial<TileFilters>) => void;
  onResetFilters: () => void;
  isOpen: boolean;
  onToggle: () => void;
  manufacturers: Manufacturer[];
}

const TileFilters: React.FC<MemberFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  isOpen,
  onToggle,
  manufacturers,
}) => {
  const manufacturersNameIdMap = useMemo(() => {
    return manufacturers.reduce(
      (acc, manufacturer) => {
        acc[manufacturer.name] = manufacturer.ID;
        return acc;
      },
      {} as Record<string, number>,
    );
  }, [manufacturers]);

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
            id="tile-search"
            value={filters.search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onFilterChange({ search: e.target.value })
            }
            className="w-full text-input"
            placeholder="Search for tiles..."
          />
        </div>
      </div>

      {/* Filter panels */}
      {isOpen && (
        <div className={filterPanelClasses}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <IconSelect
                id="tile-filter"
                iconName="collection"
                label="Manufacturer"
                value={filters.manufacturer || ''}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  onFilterChange({
                    manufacturer:
                      (e.target.value as TileManufacturer) || undefined,
                  })
                }
                options={[
                  { label: 'All', value: '' },
                  ...manufacturers.map((manufacturer) => ({
                    label: manufacturer.name,
                    value: manufacturersNameIdMap[manufacturer.name],
                  })),
                ]}
              />
            </div>

            <div>
              <IconSelect
                id="dimension-filter"
                iconName="userCircle"
                label="Dimension"
                value={filters.dimension || ''}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  onFilterChange({
                    dimension: (e.target.value as TileDimension) || undefined,
                  })
                }
                options={[
                  { label: 'All', value: '' },
                  { label: '25X40', value: '250X400' },
                  { label: '25X50', value: '250X500' },
                  { label: '30X30', value: '300X300' },
                  { label: '40X40', value: '400X400' },
                  { label: '60X60', value: '600X600' },
                ]}
              />
            </div>

            <div>
              <IconSelect
                id="tile-filter"
                iconName="collection"
                label="Type"
                value={filters.type}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  onFilterChange({
                    type: (e.target.value as TileType) || undefined,
                  })
                }
                options={[
                  { label: 'All Types', value: '' },
                  { label: 'Floor', value: 'floor' },
                  { label: 'Wall', value: 'wall' },
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

export default TileFilters;
