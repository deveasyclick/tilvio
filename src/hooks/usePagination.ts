import { useMemo } from 'react';

interface UsePaginationProps {
  currentPage: number;
  totalPages: number;
  siblingCount?: number;
}

/**
 * Custom hook for handling pagination logic
 * 
 * @param currentPage - The current active page
 * @param totalPages - Total number of pages
 * @param siblingCount - Number of siblings to show on each side of current page (default: 1)
 * @returns Array of page numbers and indicators for ellipsis
 */
export const usePagination = ({
  currentPage,
  totalPages,
  siblingCount = 1,
}: UsePaginationProps) => {
  return useMemo(() => {
    // Don't show pagination if there's only one page
    if (totalPages <= 1) return [];

    const pageNumbers: (number | string)[] = [];
    
    // Calculate the range of pages to display
    const maxPagesToShow = siblingCount * 2 + 3; // First, last, current, and siblings on both sides
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are fewer than maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page, last page, current page, and pages adjacent to current
      const firstPage = 1;
      const lastPage = totalPages;
      
      // Add first page
      pageNumbers.push(firstPage);
      
      // Add ellipsis if needed
      if (currentPage > 2 + siblingCount) {
        pageNumbers.push('start-ellipsis');
      }
      
      // Add pages around current page
      const startPage = Math.max(2, currentPage - siblingCount);
      const endPage = Math.min(totalPages - 1, currentPage + siblingCount);
      
      for (let i = startPage; i <= endPage; i++) {
        if (i !== firstPage && i !== lastPage) {
          pageNumbers.push(i);
        }
      }
      
      // Add ellipsis if needed
      if (currentPage < totalPages - (1 + siblingCount)) {
        pageNumbers.push('end-ellipsis');
      }
      
      // Add last page if not already included
      if (lastPage !== firstPage) {
        pageNumbers.push(lastPage);
      }
    }
    
    return pageNumbers;
  }, [currentPage, totalPages, siblingCount]);
};

export default usePagination;
