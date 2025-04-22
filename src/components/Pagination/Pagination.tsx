import React, { useCallback, useMemo } from 'react';
import IconWrapper from '../IconWrapper/IconWrapper';
import Button from '../Button/Button';
import usePagination from '../../hooks/usePagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  siblingCount?: number;
  showPageInfo?: boolean;
  ariaLabel?: string;
  prevButtonText?: string;
  nextButtonText?: string;
  totalItems?: number;
  pageSize?: number;
}

/**
 * Pagination component for navigating through pages
 *
 * @param currentPage - The current active page
 * @param totalPages - Total number of pages
 * @param onPageChange - Function to call when page changes
 * @param className - Additional CSS classes
 * @param siblingCount - Number of siblings to show on each side of current page (default: 1)
 * @param showPageInfo - Whether to show the page info text (default: true)
 * @param ariaLabel - Aria label for the pagination navigation (default: "Pagination")
 * @param prevButtonText - Text for the previous button on mobile view (default: "Previous")
 * @param nextButtonText - Text for the next button on mobile view (default: "Next")
 * @param totalItems - Total number of items (optional, enhances page info display)
 * @param pageSize - Number of items per page (optional, used with totalItems)
 */
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  siblingCount = 1,
  showPageInfo = true,
  ariaLabel = 'Pagination',
  prevButtonText = 'Previous',
  nextButtonText = 'Next',
  totalItems,
  pageSize,
}) => {
  // Get page numbers from custom hook
  const pageNumbers = usePagination({ currentPage, totalPages, siblingCount });

  // Memoize button styles for reuse
  const buttonStyles = useMemo(
    () => ({
      mobile: {
        base: 'relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 mr-0',
      },
      desktop: {
        base: 'relative inline-flex items-center text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 dark:ring-gray-600 mr-0 p-0',
        active:
          'z-10 bg-primary-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 dark:bg-primary-700',
        inactive:
          'text-gray-900 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700',
        prev: 'rounded-l-md px-2 py-2 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-500',
        next: 'rounded-r-md px-2 py-2 text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-gray-500',
        ellipsis: 'px-4 py-2 text-gray-700 dark:text-gray-300',
        page: 'px-4 py-2',
      },
    }),
    [],
  );

  // Generate page info text
  const pageInfoText = useMemo(() => {
    if (totalItems && pageSize) {
      const start = (currentPage - 1) * pageSize + 1;
      const end = Math.min(currentPage * pageSize, totalItems);
      return `Showing ${start}-${end} of ${totalItems} items (Page ${currentPage} of ${totalPages})`;
    }
    return `Showing page ${currentPage} of ${totalPages}`;
  }, [currentPage, totalPages, totalItems, pageSize]);

  const handlePrevious = useCallback(() => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange]);

  const handleNext = useCallback(() => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, totalPages, onPageChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, pageNumber: number | string) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (typeof pageNumber === 'number') {
          onPageChange(pageNumber);
        }
      }
    },
    [onPageChange],
  );

  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null;

  return (
    <nav
      className={`flex items-center justify-between pt-4 ${className}`}
      aria-label={ariaLabel}>
      {/* Mobile view */}
      <div className="flex justify-between sm:hidden w-full">
        <Button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={buttonStyles.mobile.base}
          aria-label="Go to previous page"
          tabIndex={0}>
          {prevButtonText}
        </Button>
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`${buttonStyles.mobile.base} ml-3`}
          aria-label="Go to next page"
          tabIndex={0}>
          {nextButtonText}
        </Button>
      </div>

      {/* Desktop view */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        {showPageInfo && (
          <div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {pageInfoText}
            </p>
          </div>
        )}
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label={ariaLabel}>
            {/* Previous button */}
            <Button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`${buttonStyles.desktop.base} ${buttonStyles.desktop.prev} disabled:opacity-50 disabled:cursor-not-allowed`}
              aria-label="Go to previous page"
              tabIndex={0}>
              <span className="sr-only">Previous</span>
              <IconWrapper name="chevronLeft" size="20" />
            </Button>

            {/* Page numbers and ellipsis */}
            {pageNumbers.map((pageNumber, index) => {
              // Render ellipsis
              if (
                pageNumber === 'start-ellipsis' ||
                pageNumber === 'end-ellipsis'
              ) {
                return (
                  <span
                    key={`ellipsis-${pageNumber}-${index}`}
                    className={`${buttonStyles.desktop.base} ${buttonStyles.desktop.ellipsis}`}
                    aria-hidden="true">
                    ...
                  </span>
                );
              }

              // Render page number
              const isCurrentPage = currentPage === pageNumber;
              return (
                <Button
                  key={`page-${pageNumber}`}
                  onClick={() => onPageChange(Number(pageNumber))}
                  onKeyDown={(e) => handleKeyDown(e, pageNumber)}
                  aria-current={isCurrentPage ? 'page' : undefined}
                  aria-label={`Page ${pageNumber}${isCurrentPage ? ', current page' : ''}`}
                  className={`${buttonStyles.desktop.base} ${buttonStyles.desktop.page} ${
                    isCurrentPage
                      ? buttonStyles.desktop.active
                      : buttonStyles.desktop.inactive
                  }`}
                  tabIndex={0}>
                  {pageNumber}
                </Button>
              );
            })}

            {/* Next button */}
            <Button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`${buttonStyles.desktop.base} ${buttonStyles.desktop.next} disabled:opacity-50 disabled:cursor-not-allowed`}
              aria-label="Go to next page"
              tabIndex={0}>
              <span className="sr-only">Next</span>
              <IconWrapper name="chevronRight" size="20" />
            </Button>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Pagination;
