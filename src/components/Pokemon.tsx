import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { usePokemonCatalogSearch } from "../hooks/usePokemonCatalogSearch";
import { usePokemonList } from "../hooks/usePokemonList";
import { getPokemonIdFromUrl } from "../utils/helpers";
import LoadingSpinner from "./LoadingSpinner";
import Pagination from "./Pagination";
import PokemonCard from "./PokemonCard";
import SearchBar from "./SearchBar";
import Icon from "./Icon";

const itemsPerPage = 20;
const maxPage = Math.ceil(1025 / itemsPerPage);

const parsePage = (value: string | null) => {
  const page = Number.parseInt(value || "1", 10);
  if (!Number.isInteger(page) || page < 1) return 1;
  return Math.min(page, maxPage);
};

const Pokemon = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = (searchParams.get("q") || "").trim();
  const currentPage = parsePage(searchParams.get("page"));
  const { pokemon, loading, error, retry: retryList } = usePokemonList(
    currentPage,
    itemsPerPage,
    !searchTerm.trim(),
  );
  const catalogSearch = usePokemonCatalogSearch(searchTerm);
  const pageResults = pokemon.results || [];
  const searchedResults = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();
    if (!normalizedTerm) return [];

    return catalogSearch.results.filter((item) => {
      const id = getPokemonIdFromUrl(item.url);
      return (
        item.name.toLowerCase().includes(normalizedTerm) ||
        String(id).includes(normalizedTerm)
      );
    });
  }, [catalogSearch.results, searchTerm]);
  const normalizedSearchTerm = searchTerm.trim();
  const isSearching = normalizedSearchTerm.length >= 2;
  const hasSearchInput = normalizedSearchTerm.length > 0;
  const activeResults = isSearching ? searchedResults : pageResults;
  const activeTotal = isSearching ? searchedResults.length : pokemon.count || 0;
  const totalPages = Math.max(1, Math.ceil(activeTotal / itemsPerPage));
  const visibleResults = isSearching
    ? searchedResults.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
      )
    : pageResults;
  const isLoading = loading || catalogSearch.loading;
  const searchNeedsMoreCharacters = searchTerm.trim().length === 1;
  const activeError = isSearching
    ? catalogSearch.error
    : searchNeedsMoreCharacters
      ? ""
      : error;
  const retryActiveQuery = isSearching ? catalogSearch.retry : retryList;

  useEffect(() => {
    const hasKnownTotal = isSearching
      ? !catalogSearch.loading
      : !loading && pokemon.count > 0;

    if (hasKnownTotal && currentPage > totalPages) {
      setSearchParams((previous) => {
        const next = new URLSearchParams(previous);
        next.set("page", String(totalPages));
        return next;
      }, { replace: true });
    }
  }, [
    catalogSearch.loading,
    currentPage,
    isSearching,
    loading,
    pokemon.count,
    setSearchParams,
    totalPages,
  ]);

  const updateSearchParams = (nextValues: {
    query?: string;
    page?: number;
  }) => {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);

      const normalizedQuery = nextValues.query?.trim();
      if (normalizedQuery) {
        next.set("q", normalizedQuery);
      } else if (nextValues.query !== undefined) {
        next.delete("q");
      }

      if (nextValues.page !== undefined) {
        if (nextValues.page > 1) {
          next.set("page", String(nextValues.page));
        } else {
          next.delete("page");
        }
      }

      return next;
    }, { replace: true });
  };

  const handleSearchChange = (value: string) => {
    updateSearchParams({ query: value, page: 1 });
  };

  const handlePageChange = (page: number) => {
    updateSearchParams({ page: Math.max(1, page) });
  };

  return (
    <section className="pokedex-page">
      <div className="page-container">
        <div>
          <div className="page-kicker">The national index</div>
          <h1 className="page-title">Choose your next discovery.</h1>
          <p className="page-intro">
            Search all Pokémon by name or National Dex number, or browse the
            index twenty at a time.
          </p>
        </div>

        <div className="list-toolbar">
          <div className="toolbar-meta" aria-live="polite">
            {isSearching ? (
              <>
                Found <strong>{activeResults.length}</strong> matches
              </>
            ) : hasSearchInput ? (
              <>Keep typing to search the full Pokédex</>
            ) : (
              <>
                Showing <strong>{pageResults.length || 0}</strong> of{" "}
                <strong>{pokemon.count || "—"}</strong> Pokémon
              </>
            )}
          </div>
          <div className="search-field">
            <SearchBar
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search name or #number..."
            />
            {searchNeedsMoreCharacters && (
              <p className="search-hint">Type at least 2 characters to search.</p>
            )}
          </div>
        </div>

        {isLoading && (
          <LoadingSpinner
            message={isSearching ? "Searching the full Pokédex..." : "Loading the next set..."}
          />
        )}

        {!isLoading && activeError && (
          <div className="error-state" role="alert">
            <div className="empty-state-icon"><Icon name="warning" size={24} /></div>
            <h2>We lost the signal.</h2>
            <p>{activeError}</p>
            <button
              type="button"
              className="button-secondary mt-lg"
              onClick={() => void retryActiveQuery()}
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading && !activeError && !searchNeedsMoreCharacters && visibleResults.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon"><Icon name="search" size={24} /></div>
            <h2>No Pokémon found.</h2>
            <p>Try another name or number, or clear the search to browse again.</p>
            <button
              type="button"
              className="button-secondary mt-lg"
              onClick={() => handleSearchChange("")}
            >
              Clear search
            </button>
          </div>
        )}

        {!isLoading && !activeError && visibleResults.length > 0 && (
          <>
            <div className="pokemon-grid">
              {visibleResults.map((pokemon, index) => {
                const id = isSearching
                  ? getPokemonIdFromUrl(pokemon.url)
                  : currentPage * itemsPerPage - itemsPerPage + index + 1;
                return <PokemonCard key={pokemon.name} pokemon={pokemon} id={id} />;
              })}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default Pokemon;
