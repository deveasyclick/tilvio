import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

// Mock the Button component
jest.mock('../Button/Button', () => {
  return ({
    children,
    onClick,
    disabled,
    className,
    'aria-label': ariaLabel,
    'aria-current': ariaCurrent,
    tabIndex,
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      tabIndex={tabIndex}>
      {children}
    </button>
  );
});

describe('Pagination Component', () => {
  const mockPageChange = jest.fn();

  beforeEach(() => {
    mockPageChange.mockClear();
  });

  test('renders pagination with correct page numbers', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockPageChange}
      />,
    );

    // Check if current page is highlighted
    const currentPageButton = screen.getByRole('button', {
      name: /page 3, current page/i,
    });
    expect(currentPageButton).toHaveAttribute('aria-current', 'page');

    // Check if all expected page numbers are rendered
    expect(screen.getByRole('button', { name: /page 1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /page 2/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /page 3/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /page 4/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /page 5/i })).toBeInTheDocument();
  });

  test('calls onPageChange when page button is clicked', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockPageChange}
      />,
    );

    // Click on page 2
    fireEvent.click(screen.getByRole('button', { name: /page 2/i }));
    expect(mockPageChange).toHaveBeenCalledWith(2);
  });

  test('calls onPageChange when previous/next buttons are clicked', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockPageChange}
      />,
    );

    // Click previous button
    fireEvent.click(
      screen.getByRole('button', { name: /go to previous page/i }),
    );
    expect(mockPageChange).toHaveBeenCalledWith(2);

    // Click next button
    fireEvent.click(screen.getByRole('button', { name: /go to next page/i }));
    expect(mockPageChange).toHaveBeenCalledWith(4);
  });

  test('disables previous button on first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockPageChange}
      />,
    );

    const prevButton = screen.getByRole('button', {
      name: /go to previous page/i,
    });
    expect(prevButton).toBeDisabled();
  });

  test('disables next button on last page', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockPageChange}
      />,
    );

    const nextButton = screen.getByRole('button', { name: /go to next page/i });
    expect(nextButton).toBeDisabled();
  });

  test('renders custom button text', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockPageChange}
        prevButtonText="Prev"
        nextButtonText="Next"
      />,
    );

    // Check mobile view buttons (need to force mobile view in test)
    const mobileView = screen.getByText('Prev');
    expect(mobileView).toBeInTheDocument();

    const mobileNextView = screen.getByText('Next');
    expect(mobileNextView).toBeInTheDocument();
  });

  test('renders enhanced page info with totalItems and pageSize', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockPageChange}
        totalItems={48}
        pageSize={10}
      />,
    );

    // Should show "Showing 11-20 of 48 items (Page 2 of 5)"
    const pageInfo = screen.getByText(/showing 11-20 of 48 items/i);
    expect(pageInfo).toBeInTheDocument();
  });

  test('does not render pagination when totalPages <= 1', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={mockPageChange}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  test('supports keyboard navigation', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockPageChange}
      />,
    );

    // Test keyboard navigation with Enter key
    const pageButton = screen.getByRole('button', { name: /page 2/i });
    fireEvent.keyDown(pageButton, { key: 'Enter' });
    expect(mockPageChange).toHaveBeenCalledWith(2);

    // Test keyboard navigation with Space key
    fireEvent.keyDown(pageButton, { key: ' ' });
    expect(mockPageChange).toHaveBeenCalledWith(2);
  });
});
