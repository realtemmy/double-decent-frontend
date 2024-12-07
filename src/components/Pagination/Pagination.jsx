import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PropTypes from "prop-types";

const PaginationButton = ({ data, onPageChange }) => {
  const { currentPage, totalPages, hasPrevPage, hasNextPage, totalItems } =
    data;

  // Generate the page numbers dynamically
  const getPageNumbers = () => {
    const range = 2; // Number of pages before and after the current page
    const pages = [];
    const start = Math.max(1, currentPage - range);
    const end = Math.min(totalPages, currentPage + range);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            aria-label="Go to previous page"
            disabled={!hasPrevPage}
            onClick={() => hasPrevPage && onPageChange(currentPage - 1)}
            className={hasPrevPage ? "cursor-pointer" : "cursor-not-allowed"}
          />
        </PaginationItem>

        {/* Page Numbers */}
        {getPageNumbers().map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={page === currentPage}
              onClick={() => onPageChange(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Ellipsis and Last Page */}
        {currentPage < totalPages - 2 && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                isActive={totalPages === currentPage}
                onClick={() => onPageChange(totalPages)}
              >
                {totalItems}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            aria-label="Go to next page"
            disabled={!hasNextPage}
            onClick={() => hasNextPage && onPageChange(currentPage + 1)}
            className={hasNextPage ? "cursor-pointer" : "cursor-not-allowed"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

// PropTypes for validation
PaginationButton.propTypes = {
  data: PropTypes.shape({
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    hasPrevPage: PropTypes.bool.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
    totalItems: PropTypes.number.isRequired,
  }).isRequired,
  onPageChange: PropTypes.func.isRequired, // Callback function for handling page changes
};

// Default props in case data is optional
PaginationButton.defaultProps = {
  data: {
    currentPage: 1,
    totalPages: 1,
    hasPrevPage: false,
    hasNextPage: false,
    totalItems: 0,
  },
};

export default PaginationButton;
