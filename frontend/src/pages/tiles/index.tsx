import TileCard from '@/pages/tiles/components/TileCard';
import { useFilterTiles } from '../../api/tiles';
import Pagination from '@/components/Pagination';
import { useCallback, useMemo, useState } from 'react';
import TileFilters from './components/TileFilters';
import useToggleState from '@/hooks/useToggleState';
import type { TileFilters as TileFiltersType } from '@/types/tile';
import useDebounce from '@/hooks/useDebounce';
import { useFindAllManufacturers } from '@/api/manufacturers';

const DEFAULT_FILTERS: TileFiltersType = {
  search: '',
  dimension: '400X400',
  type: undefined,
  manufacturer: undefined,
};

export default function Tiles() {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersOpen, toggleFilters] = useToggleState(false);
  const [filters, setFiltersState] = useState<TileFiltersType>(DEFAULT_FILTERS);
  const debouncedValue = useDebounce(filters, 750);

  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    if (debouncedValue.dimension)
      params.append('dimension_like', debouncedValue.dimension);
    if (debouncedValue.search) {
      params.append('search', debouncedValue.search);
      params.append(
        'search_fields',
        'code,dimension,type,description,manufacturers.name',
      );
    }

    if (debouncedValue.manufacturer)
      params.append('manufacturer_id', debouncedValue.manufacturer);
    if (debouncedValue.type) params.append('type', debouncedValue.type);
    params.append('page', String(currentPage));

    return params.toString(); // e.g. size=600X600&page=1
  }, [debouncedValue, currentPage]);

  const { data, isLoading } = useFilterTiles(queryString);
  const setFilters = useCallback((newFilters: Partial<TileFiltersType>) => {
    setFiltersState((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset to first page when filters change
  }, []);

  // Reset filters to defaults
  const resetFilters = useCallback(() => {
    setFiltersState(DEFAULT_FILTERS);
    setCurrentPage(1);
  }, []);
  const { data: manufacturers } = useFindAllManufacturers();
  if (isLoading) return <div>Loading...</div>;
  return (
    <section>
      <TileFilters
        isOpen={isFiltersOpen}
        onToggle={toggleFilters}
        filters={filters}
        onFilterChange={setFilters}
        onResetFilters={resetFilters}
        manufacturers={manufacturers || []}
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-2 bg-black">
        {data?.tiles?.map((tile) => <TileCard key={tile.code} {...tile} />)}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Showing <span className="font-medium">{data?.tiles?.length}</span> of{' '}
          <span className="font-medium">{data?.total}</span> tiles
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={data?.totalPages || 0}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
}
