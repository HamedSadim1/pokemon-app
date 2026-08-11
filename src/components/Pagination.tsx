import React from "react";
import Icon from "./Icon";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <nav className="pagination" aria-label="Pokémon list pagination">
      <button
        type="button"
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <Icon name="arrow-left" size={16} /> Previous
      </button>
      <div className="pagination-status" aria-live="polite">
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </div>
      <button
        type="button"
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next <Icon name="arrow-right" size={16} />
      </button>
    </nav>
  );
};

export default Pagination;
