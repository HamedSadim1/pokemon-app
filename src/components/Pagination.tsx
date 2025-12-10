import React from "react";

/**
 * Props interface voor de Pagination component
 */
interface PaginationProps {
  /** Het huidige pagina nummer (1-based) */
  currentPage: number;
  /** Het totale aantal pagina's */
  totalPages: number;
  /** Callback functie die wordt aangeroepen bij pagina verandering */
  onPageChange: (page: number) => void;
  /** Het huidige thema voor juiste styling */
  theme: "dark" | "light";
}

/**
 * Herbruikbare paginering component met Previous/Next knoppen en pagina indicator.
 * Toont alleen relevante controls en disabled states voor edge cases.
 * Gebruikt glassmorphism styling voor moderne uitstraling.
 *
 * Features:
 * - Previous/Next knoppen met hover effecten
 * - Pagina indicator (bijv. "Page 2 of 10")
 * - Disabled states voor eerste/laatste pagina
 * - Theme ondersteuning (dark/light)
 * - Gradient hover effecten
 *
 * @param props - De component props
 * @returns JSX element voor de paginering controls
 *
 * @example
 * ```tsx
 * <Pagination
 *   currentPage={2}
 *   totalPages={10}
 *   onPageChange={setCurrentPage}
 *   theme="dark"
 * />
 * ```
 */
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  theme,
}) => {
  return (
    <div className="flex justify-center items-center space-x-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
          currentPage === 1
            ? "bg-gray-300 text-gray-500"
            : "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-0.5"
        }`}
      >
        <span className="flex items-center gap-2">← Previous</span>
      </button>

      <div
        className={`px-6 py-3 rounded-xl font-semibold ${
          theme === "dark"
            ? "bg-white/10 backdrop-blur-sm text-white border border-white/20"
            : "bg-white shadow-lg text-gray-700 border border-gray-200"
        }`}
      >
        Page {currentPage} of {totalPages}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`group relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-500"
            : "bg-linear-to-r from-purple-500 to-pink-600 text-white shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-0.5"
        }`}
      >
        <span className="flex items-center gap-2">Next →</span>
      </button>
    </div>
  );
};

export default Pagination;
