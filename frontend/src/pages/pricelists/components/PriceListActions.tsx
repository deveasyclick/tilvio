import React from 'react';
import IconWrapper from '../../../components/IconWrapper/IconWrapper';
import Button from '../../../components/Button/Button';

// Common button classes for consistent styling
const buttonBaseClasses =
  'font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center focus:outline-none focus:ring-4';
const primaryButtonClasses = `${buttonBaseClasses} text-white bg-primary hover:bg-primary-600 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-pointer`;
const dangerButtonClasses = `${buttonBaseClasses} text-white bg-error hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800`;

interface PriceListActionsProps {
  selectedCount: number;
  onDeleteSelected: () => void;
  onAddPriceList: () => void;
}

const PriceListActions: React.FC<PriceListActionsProps> = ({
  selectedCount,
  onDeleteSelected,
  onAddPriceList,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
      {/* TODO: Make it a reusable component */}
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white ml-0">
        Pricelists
      </h1>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          className={primaryButtonClasses}
          onClick={onAddPriceList}>
          <IconWrapper name="plus" size="16" className="mr-2" />
          Add Pricelist
        </Button>

        {selectedCount > 0 && (
          <Button
            type="button"
            onClick={onDeleteSelected}
            className={dangerButtonClasses}>
            <IconWrapper name="trash" size="16" className="mr-2" />
            Delete Selected ({selectedCount})
          </Button>
        )}
      </div>
    </div>
  );
};

export default PriceListActions;
