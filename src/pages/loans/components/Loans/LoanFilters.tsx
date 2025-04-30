import { memo, useState } from 'react';
import { OptionType } from '../../../../components/Select';
import IconWrapper from '../../../../components/IconWrapper/IconWrapper';
import Input from '../../../../components/Input/Input';
import { LoanFilterOptions, LoanStatus } from '../../../../types/loan';
import IconSelect from '../../../../components/Select/IconSelect';

/**
 * Extended loan filter options with search term
 */
type LoanFilters = LoanFilterOptions & {
  searchTerm?: string;
};

/**
 * Props for the LoanFilters component
 */
type LoanFiltersProps = {
  onFilterChange?: (filters: LoanFilters) => void;
};

/**
 * Loan status options for filter dropdown
 */
const STATUS_OPTIONS: OptionType[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'defaulted', label: 'Defaulted' },
];

/**
 * Loan purpose options for filter dropdown
 */
const PURPOSE_OPTIONS: OptionType[] = [
  { value: 'all', label: 'All purposes' },
  { value: 'business', label: 'Business' },
  { value: 'education', label: 'Education' },
  { value: 'home_improvement', label: 'Home Improvement' },
  { value: 'medical', label: 'Medical' },
  { value: 'personal', label: 'Personal' },
  { value: 'other', label: 'Other' },
];

/**
 * Loan filters component
 *
 * Provides filters for loan status, purpose, amount range, and date range
 */
const LoanFilters = memo(({ onFilterChange }: LoanFiltersProps = {}) => {
  // Filter state
  const [status, setStatus] = useState<LoanStatus | 'all'>('all');
  const [purpose, setPurpose] = useState<string>('all');
  const [minAmount, setMinAmount] = useState<string>('');
  const [maxAmount, setMaxAmount] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // Call onFilterChange if provided
    if (onFilterChange) {
      onFilterChange({
        searchTerm: e.target.value,
        status,
        purpose,
        minAmount: minAmount ? Number(minAmount) : undefined,
        maxAmount: maxAmount ? Number(maxAmount) : undefined,
        startDate,
        endDate,
      });
    }
  };

  // Handle status change
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as LoanStatus | 'all');
    // Call onFilterChange if provided
    if (onFilterChange) {
      onFilterChange({
        searchTerm,
        status: e.target.value as LoanStatus | 'all',
        purpose,
        minAmount: minAmount ? Number(minAmount) : undefined,
        maxAmount: maxAmount ? Number(maxAmount) : undefined,
        startDate,
        endDate,
      });
    }
  };

  // Handle purpose change
  const handlePurposeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPurpose(e.target.value);
    // Call onFilterChange if provided
    if (onFilterChange) {
      onFilterChange({
        searchTerm,
        status,
        purpose: e.target.value,
        minAmount: minAmount ? Number(minAmount) : undefined,
        maxAmount: maxAmount ? Number(maxAmount) : undefined,
        startDate,
        endDate,
      });
    }
  };

  return (
    <div className="mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4">
        {/* Search input */}
        <div className="w-full md:w-1/3 relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <IconWrapper
              name="search"
              className="text-gray-500 dark:text-gray-400"
            />
          </div>
          <Input
            type="text"
            className="input"
            placeholder="Search loans by member name or ID"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div className="w-full md:w-2/3 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
          {/* Status filter */}
          <div className="w-full md:w-1/4">
            <IconSelect
              iconName="eye"
              label="Status"
              options={STATUS_OPTIONS}
              value={status}
              onChange={(e) => handleStatusChange(e)}
              className="input"
            />
          </div>

          {/* Purpose filter */}
          <div className="w-full md:w-1/4">
            <IconSelect
              iconName="collection"
              label="Purpose"
              options={PURPOSE_OPTIONS}
              value={purpose}
              onChange={handlePurposeChange}
            />
          </div>

          {/* Amount range filters */}
          <div className="w-full md:w-1/4 flex space-x-2">
            <div className="w-1/2">
              <label
                htmlFor="min-amount"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Min Amount
              </label>
              <Input
                type="number"
                id="min-amount"
                placeholder="Min"
                className="input"
                value={minAmount}
                onChange={(e) => {
                  setMinAmount(e.target.value);
                  if (onFilterChange) {
                    onFilterChange({
                      searchTerm,
                      status,
                      purpose,
                      minAmount: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                      maxAmount: maxAmount ? Number(maxAmount) : undefined,
                      startDate,
                      endDate,
                    });
                  }
                }}
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="max-amount"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Max Amount
              </label>
              <Input
                type="number"
                id="max-amount"
                placeholder="Max"
                className="input"
                value={maxAmount}
                onChange={(e) => {
                  setMaxAmount(e.target.value);
                  if (onFilterChange) {
                    onFilterChange({
                      searchTerm,
                      status,
                      purpose,
                      minAmount: minAmount ? Number(minAmount) : undefined,
                      maxAmount: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                      startDate,
                      endDate,
                    });
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Date range filters - second row */}
      <div className="mt-4 flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/4">
          <label
            htmlFor="start-date"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Start Date
          </label>
          <Input
            type="date"
            id="start-date"
            className="input"
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
              if (onFilterChange) {
                onFilterChange({
                  searchTerm,
                  status,
                  purpose,
                  minAmount: minAmount ? Number(minAmount) : undefined,
                  maxAmount: maxAmount ? Number(maxAmount) : undefined,
                  startDate: e.target.value,
                  endDate,
                });
              }
            }}
          />
        </div>
        <div className="w-full md:w-1/4">
          <label
            htmlFor="end-date"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            End Date
          </label>
          <Input
            type="date"
            id="end-date"
            className="input"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
              if (onFilterChange) {
                onFilterChange({
                  searchTerm,
                  status,
                  purpose,
                  minAmount: minAmount ? Number(minAmount) : undefined,
                  maxAmount: maxAmount ? Number(maxAmount) : undefined,
                  startDate,
                  endDate: e.target.value,
                });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
});

export default LoanFilters;
