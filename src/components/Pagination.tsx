import React from "react";
import Icon from "./Icon";
import { ICON_CONFIG, UI_COPY } from "@/config";

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
    <nav className="pagination" aria-label={UI_COPY.pagination.navLabel}>
      <button
        type="button"
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label={UI_COPY.pagination.previousLabel}
      >
        <Icon name="arrow-left" size={ICON_CONFIG.sizes.small} /> Previous
      </button>
      <div className="pagination-status" aria-live="polite">
        Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
      </div>
      <button
        type="button"
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label={UI_COPY.pagination.nextLabel}
      >
        Next <Icon name="arrow-right" size={ICON_CONFIG.sizes.small} />
      </button>
    </nav>
  );
};

export default Pagination;
