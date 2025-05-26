import { memo, useMemo, useCallback, useRef, useEffect } from "react"; // React hooks for optimization and side effects
import styled from "styled-components"; // CSS-in-JS library for styling

// Pagination component, memoized for performance optimization.
const Pagination = memo(
  ({
    data = [], // Array of items to paginate
    itemsPerPage = 5, // Number of items to display per page
    currentPage = 1, // The current active page number
    onPageChange, // Callback function when the page changes
    onDataChange, // Callback function to return paginated data
    maxVisiblePages = 7, // Maximum number of pagination buttons to show
  }) => {
    const totalItems = data.length; // Total number of items
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1; // Calculate total pages, ensure at least 1

    // useRef to track the last notified state to prevent unnecessary onDataChange calls.
    const lastNotifiedRef = useRef({ page: 0, totalItems: 0, itemsPerPage: 0 });

    // Ensure currentPage is within valid bounds.
    const safeCurrentPage = useMemo(
      () => Math.min(Math.max(currentPage, 1), totalPages),
      [currentPage, totalPages]
    );

    // Memoize the slice of data for the current page.
    const paginatedData = useMemo(() => {
      const startIdx = (safeCurrentPage - 1) * itemsPerPage;
      return data.slice(startIdx, startIdx + itemsPerPage);
    }, [data, safeCurrentPage, itemsPerPage]);

    // Memoize page information object.
    const pageInfo = useMemo(
      () => ({
        currentPage: safeCurrentPage,
        totalPages,
        itemsPerPage,
        totalItems,
      }),
      [safeCurrentPage, totalPages, itemsPerPage, totalItems]
    );

    // Effect to notify the parent component with the current paginated data.
    // This runs only when relevant pagination parameters or data actually change.
    useEffect(() => {
      if (!onDataChange) return; // Exit if no callback is provided

      const last = lastNotifiedRef.current;
      const hasChanged =
        last.page !== safeCurrentPage ||
        last.totalItems !== totalItems ||
        last.itemsPerPage !== itemsPerPage;

      if (hasChanged) {
        onDataChange(paginatedData, pageInfo); // Call parent callback
        lastNotifiedRef.current = {
          page: safeCurrentPage,
          totalItems,
          itemsPerPage,
        }; // Update last notified state
      }
    }, [
      onDataChange,
      paginatedData,
      pageInfo,
      safeCurrentPage,
      totalItems,
      itemsPerPage,
    ]);

    // Memoize the array of page numbers to display, including ellipsis logic.
    const pageNumbers = useMemo(() => {
      if (totalPages <= maxVisiblePages) {
        // If total pages are less than or equal to max visible, show all.
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      const half = Math.floor(maxVisiblePages / 2); // Half of visible pages for centering
      const pages = [];
      // Helper for creating ellipsis objects
      const ellipsis = (targetPage) => ({ type: "ellipsis", targetPage });

      // Logic for displaying page numbers with ellipses
      if (safeCurrentPage <= half + 1) {
        // Current page is near the beginning
        for (let i = 1; i <= maxVisiblePages - 2; i++) {
          pages.push(i);
        }
        pages.push(ellipsis(Math.min(totalPages - 1, maxVisiblePages))); // First ellipsis
        pages.push(totalPages); // Last page
      } else if (safeCurrentPage >= totalPages - half) {
        // Current page is near the end
        pages.push(1); // First page
        const startPage = totalPages - (maxVisiblePages - 3);
        pages.push(ellipsis(Math.max(2, startPage - 1))); // Second ellipsis
        for (let i = startPage; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Current page is in the middle
        pages.push(1); // First page
        pages.push(ellipsis(Math.max(2, safeCurrentPage - half))); // First ellipsis

        const start = safeCurrentPage - (half - 1);
        const end = safeCurrentPage + (half - 1);
        for (let i = start; i <= end; i++) {
          pages.push(i); // Middle pages around current page
        }

        pages.push(ellipsis(Math.min(totalPages - 1, safeCurrentPage + half))); // Second ellipsis
        pages.push(totalPages); // Last page
      }

      return pages;
    }, [safeCurrentPage, totalPages, maxVisiblePages]);

    // Callback for handling page button clicks (including ellipsis).
    const handlePageClick = useCallback(
      (page) => {
        if (!onPageChange) return;

        // Determine the actual target page number for ellipsis clicks
        const targetPage =
          typeof page === "object" && page.type === "ellipsis"
            ? Math.min(Math.max(page.targetPage, 1), totalPages)
            : page;

        // Only call onPageChange if the target page is different and valid.
        if (typeof targetPage === "number" && targetPage !== safeCurrentPage) {
          onPageChange(targetPage);
        }
      },
      [onPageChange, safeCurrentPage, totalPages]
    );

    // Callback for handling "Previous" button click.
    const handlePrevious = useCallback(() => {
      if (safeCurrentPage > 1 && onPageChange) {
        onPageChange(safeCurrentPage - 1);
      }
    }, [safeCurrentPage, onPageChange]);

    // Callback for handling "Next" button click.
    const handleNext = useCallback(() => {
      if (safeCurrentPage < totalPages && onPageChange) {
        onPageChange(safeCurrentPage + 1);
      }
    }, [safeCurrentPage, totalPages, onPageChange]);

    // Determine if "Previous" or "Next" buttons should be disabled.
    const isFirstPage = safeCurrentPage <= 1;
    const isLastPage = safeCurrentPage >= totalPages;

    // Render nothing if there's only one page or no data.
    if (totalPages <= 1) return <></>;

    // Main render of the pagination component.
    return (
      <PaginationContainer>
        <ArrowButton
          onClick={handlePrevious}
          disabled={isFirstPage}
          aria-label="Previous Page"
          type="button"
        >
          &#8592; {/* Left arrow character */}
        </ArrowButton>

        {pageNumbers.map((page, idx) => {
          const isEllipsis = typeof page === "object"; // Check if it's an ellipsis object
          const pageNumber = isEllipsis ? page.targetPage : page; // Get the actual page number
          const isActive = !isEllipsis && page === safeCurrentPage; // Check if the button is active

          return (
            <PaginationButton
              key={isEllipsis ? `ellipsis-${idx}` : page} // Unique key for rendering
              $active={isActive} // Prop for styling active state
              $isEllipsis={isEllipsis} // Prop for styling ellipsis
              onClick={() => handlePageClick(page)} // Click handler
              aria-label={
                isEllipsis ? `Go to page ${pageNumber}` : `Page ${page}`
              } // ARIA label for accessibility
              aria-current={isActive ? "page" : undefined} // ARIA attribute for current page
              type="button" // Specify button type
            >
              {isEllipsis ? "..." : page} {/* Display "..." for ellipsis */}
            </PaginationButton>
          );
        })}

        <ArrowButton
          onClick={handleNext}
          disabled={isLastPage}
          aria-label="Next Page"
          type="button"
        >
          &#8594; {/* Right arrow character */}
        </ArrowButton>
      </PaginationContainer>
    );
  }
);

Pagination.displayName = "Pagination"; // Assign a display name for React DevTools

//  PaginationContainer
const PaginationContainer = styled.div`
  display: flex; // Arranges items in a row
  justify-content: center; // Centers items horizontally
  gap: ${({ theme }) => theme.spacing.md}; // Spacing between buttons
  margin-top: ${({ theme }) =>
    theme.spacing["3xl"]}; // Top margin for spacing from content
  flex-wrap: wrap; // Allows buttons to wrap to the next line on smaller screens
`;

const PaginationButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md}; // Padding for button size
  border: none; // No border
  background: ${({ $active, theme }) =>
    $active
      ? theme.colors.primary
      : "transparent"}; // Background changes based on active state
  color: ${({ $active, theme }) =>
    $active
      ? "white"
      : theme.colors.primary}; // Text color changes based on active state
  border-radius: ${({ theme }) => theme.borderRadius.md}; // Rounded corners
  cursor: pointer; // Pointer cursor on hover
  font-size: 1rem; // Font size
  font-weight: 900; // Bold font weight
  transition: ${({ theme }) => theme.transitions.default}; // Smooth transitions
  user-select: none; // Prevents text selection
  outline: none; // Removes default outline
  align-items: center; // Centers content vertically
  justify-content: center; // Centers content horizontally

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary}; // Hover background
    color: ${({ $active, theme }) =>
      $active ? "white" : theme.colors.secondary}; // Hover text color
    transform: translateY(-2px); // Slight lift on hover
  }

  &:active:not(:disabled) {
    color: ${({ theme }) => theme.colors.secondary}; // Text color when active
    transform: translateY(-2px); // Slight lift on active
  }

  &:disabled {
    opacity: 0.5; // Reduced opacity when disabled
    cursor: not-allowed; // Not-allowed cursor when disabled
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary}; // Outline for keyboard navigation
    outline-offset: 2px; // Offset for the outline
  }
`;

const ArrowButton = styled.button`
  background: transparent; // Transparent background
  border: none; // No border
  color: ${({ theme, disabled }) =>
    disabled
      ? theme.colors.disabled || "#ccc"
      : theme.colors.primary}; // Color based on disabled state
  cursor: ${({ disabled }) =>
    disabled ? "not-allowed" : "pointer"}; // Cursor based on disabled state
  font-size: 1.2rem; // Font size
  font-weight: 600; // Font weight
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md}; // Padding
  transition: all 0.3s ease; // Smooth transitions
  opacity: ${({ disabled }) =>
    disabled ? 0.5 : 1}; // Opacity based on disabled state
  outline: none; // Removes default outline

  &:hover:not(:disabled) {
    color: ${({ $active, theme }) =>
      $active ? "white" : theme.colors.secondary}; // Hover text color
    transform: translateY(-2px); // Slight lift on hover
  }

  &:active:not(:disabled) {
    transform: translateY(0); // Reset transform on active
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary}; // Outline for keyboard navigation
    outline-offset: 2px; // Offset for the outline
  }

  @media (max-width: ${({ theme }) => theme?.breakpoints?.sm || "640px"}) {
    font-size: 1.25rem; // Adjust font size on small screens
  }
`;

export default Pagination;
