import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { usePokemonList } from "../hooks/usePokemonList";
import { usePokemonSearch } from "../hooks/usePokemonSearch";
import SearchBar from "./SearchBar";
import LoadingSpinner from "./LoadingSpinner";
import PokemonCard from "./PokemonCard";
import Pagination from "./Pagination";
import { calculateTotalPages } from "../utils/helpers";

/**
 * Hoofdcomponent voor de Pokémon lijst pagina.
 * Toont een lijst met Pokémon met zoek- en pagineringsfunctionaliteit.
 * Gebruikt glassmorphism styling voor een moderne uitstraling.
 *
 * Features:
 * - Zoeken door Pokémon namen
 * - Paginering (20 Pokémon per pagina)
 * - Responsive grid layout
 * - Loading states en error handling
 * - Dark/light theme ondersteuning
 *
 * @returns JSX element voor de Pokémon lijst pagina
 */
const Pokemon = () => {
  const { theme } = useTheme();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20;

  const { pokemon, loading, error } = usePokemonList(currentPage, itemsPerPage);
  const { searchTerm, setSearchTerm, filteredResults } = usePokemonSearch(
    pokemon.results || []
  );

  const totalPages = calculateTotalPages(pokemon.count || 0, itemsPerPage);

  return (
    <div
      className={`min-h-screen py-8 pt-24 ${
        theme === "dark"
          ? "bg-linear-to-br from-gray-900 via-purple-900 to-violet-900"
          : "bg-linear-to-br from-blue-400 via-purple-500 to-pink-500"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="mb-12">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            theme={theme}
            placeholder="Search Pokémon..."
          />
        </div>

        {/* Loading State */}
        {loading && (
          <LoadingSpinner theme={theme} message="Loading Pokémon..." />
        )}

        {/* No Results */}
        {!loading && filteredResults.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3
              className={`text-2xl font-bold mb-2 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              No Pokémon Found
            </h3>
            <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
              Try searching for a different Pokémon name
            </p>
          </div>
        )}

        {/* Pokémon Grid */}
        {!loading && filteredResults.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
            {filteredResults.map((p, index) => (
              <PokemonCard
                key={p.name}
                pokemon={p}
                id={currentPage * itemsPerPage - itemsPerPage + index + 1}
                theme={theme}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && filteredResults.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            theme={theme}
          />
        )}

        {/* Error State */}
        {error && (
          <div
            className={`mt-8 p-6 rounded-2xl shadow-lg border-l-4 border-red-500 ${
              theme === "dark"
                ? "bg-red-900/20 border-red-500/50 text-red-200"
                : "bg-red-50 border-red-500 text-red-700"
            }`}
          >
            <div className="flex items-center">
              <div className="shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{error}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pokemon;
