import React from "react";

/**
 * Props interface voor de SearchBar component
 */
interface SearchBarProps {
  /** De huidige waarde van het zoekveld */
  value: string;
  /** Callback functie die wordt aangeroepen bij waarde verandering */
  onChange: (value: string) => void;
  /** Placeholder tekst voor het zoekveld */
  placeholder?: string;
  /** Het huidige thema voor juiste styling */
  theme: "dark" | "light";
}

/**
 * Herbruikbare zoekbalk component met glassmorphism styling en zoek icoon.
 * Beheert zijn eigen interne state en roept onChange callback aan bij veranderingen.
 * Gebruikt controlled component pattern voor externe state management.
 *
 * Features:
 * - Zoek icoon links van het input veld
 * - Glassmorphism styling met backdrop blur
 * - Theme ondersteuning (dark/light)
 * - Focus states met ring effecten
 * - Responsive design
 *
 * @param props - De component props
 * @returns JSX element voor de zoekbalk
 *
 * @example
 * ```tsx
 * <SearchBar
 *   value={searchTerm}
 *   onChange={setSearchTerm}
 *   placeholder="Search Pokémon..."
 *   theme="dark"
 * />
 * ```
 */
const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  theme,
}) => {
  return (
    <div className="relative max-w-md mx-auto">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        className={`block w-full pl-10 pr-3 py-4 border-0 rounded-2xl shadow-2xl focus:ring-4 focus:ring-yellow-400/20 focus:outline-none transition-all duration-300 ${
          theme === "dark"
            ? "bg-white/10 backdrop-blur-sm border-gray-700/50 text-white placeholder-gray-400"
            : "bg-white/80 backdrop-blur-sm text-gray-900 placeholder-gray-500"
        }`}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
