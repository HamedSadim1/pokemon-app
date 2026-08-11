import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { usePokemonCatalogSearch, usePokemonList } from "@/hooks";
import { getIdFromUrl } from "@/utils";
import { PokemonPageSkeleton } from "./LoadingSkeletons";
import CatalogResults, { type CatalogCard } from "./CatalogResults";
import CatalogToolbar from "./CatalogToolbar";
import { POKEMON_CONFIG, SEARCH_CONFIG, UI_COPY, resolveTotalSpecies } from "@/config";

const itemsPerPage = POKEMON_CONFIG.itemsPerPage;

// Alleen integer-validatie (geen vaste bovengrens meer): de dynamische correctie
// van een te hoge pagina gebeurt via het effect zodra de live API-count bekend is.
const parsePage = (value: string | null) => {
  const page = Number.parseInt(value || "1", 10);
  if (!Number.isInteger(page) || page < 1) return 1;
  return page;
};

const Pokemon = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = (searchParams.get("q") || "").trim();
  const currentPage = parsePage(searchParams.get("page"));
  const { pokemon, loading, fetching, placeholder, error, retry: retryList } = usePokemonList(
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
      const id = getIdFromUrl(item.url, "pokemon");
      return (
        item.name.toLowerCase().includes(normalizedTerm) ||
        String(id).includes(normalizedTerm)
      );
    });
  }, [catalogSearch.results, searchTerm]);
  const normalizedSearchTerm = searchTerm.trim();
  const isSearching = normalizedSearchTerm.length >= SEARCH_CONFIG.minLength;
  const hasSearchInput = normalizedSearchTerm.length > 0;
  const activeResults = isSearching ? searchedResults : pageResults;
  const activeTotal = isSearching
    ? searchedResults.length
    : resolveTotalSpecies(pokemon.count);
  const totalPages = Math.max(1, Math.ceil(activeTotal / itemsPerPage));
  const visibleResults = isSearching
    ? searchedResults.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
      )
    : pageResults;
  const isLoading = loading || catalogSearch.loading;
  const showListSkeleton = isLoading && visibleResults.length === 0;
  const isRefreshing = fetching || catalogSearch.fetching || placeholder || (isLoading && visibleResults.length > 0);
  const searchNeedsMoreCharacters =
    searchTerm.trim().length === SEARCH_CONFIG.minLength - 1;
  const activeError = isSearching
    ? catalogSearch.error
    : searchNeedsMoreCharacters
      ? ""
      : error;
  const retryActiveQuery = isSearching ? catalogSearch.retry : retryList;
  const cards: CatalogCard[] = visibleResults.map((pokemon, index) => {
    const id =
      getIdFromUrl(pokemon.url, "pokemon") ||
      (currentPage * itemsPerPage - itemsPerPage + index + 1);
    return { pokemon, id };
  });
  // Toon de empty-state enkel wanneer de huidige pagina binnen het bereik ligt;
  // een tijdelijke out-of-range pagina wordt daarna door het effect gecorrigeerd.
  const showEmptyState =
    !activeError &&
    !searchNeedsMoreCharacters &&
    cards.length === 0 &&
    currentPage <= totalPages;

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

  if (showListSkeleton) {
    return (
      <PokemonPageSkeleton
        message={isSearching ? UI_COPY.loading.searchingCatalog : UI_COPY.loading.listMessage}
      />
    );
  }

  return (
    <section className="pokedex-page">
      <div className="page-container">
        <div>
          <div className="page-kicker">The national index</div>
          <h1 className="page-title">Choose your next discovery.</h1>
          <p className="page-intro">
            Search all Pokémon by name or National Dex number, or browse the
            index {POKEMON_CONFIG.itemsPerPage} at a time.
          </p>
        </div>

        <CatalogToolbar
          isSearching={isSearching}
          hasSearchInput={hasSearchInput}
          foundCount={activeResults.length}
          shownCount={pageResults.length}
          totalCount={pokemon.count}
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          searchNeedsMoreCharacters={searchNeedsMoreCharacters}
        />

        <CatalogResults
          isRefreshing={isRefreshing}
          error={activeError}
          onRetry={retryActiveQuery}
          showEmptyState={showEmptyState}
          onClearSearch={() => handleSearchChange("")}
          cards={cards}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default Pokemon;
