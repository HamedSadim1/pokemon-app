import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPokemon, type PokemonResult, type Result } from "../components/Services/IPokemon";
import { queryPolicies } from "../query/queryClient";
import { useQueryState, type QueryState } from "./useQueryState";

interface UsePokemonCatalogSearchResult {
  results: Result[];
  loading: boolean;
  fetching: boolean;
  error: string;
  ready: boolean;
  retry: QueryState<PokemonResult>["retry"];
}

const NATIONAL_DEX_LIMIT = 1025;
const MIN_SEARCH_LENGTH = 2;
const SEARCH_DEBOUNCE_MS = 250;

export const usePokemonCatalogSearch = (
  searchTerm: string,
): UsePokemonCatalogSearchResult => {
  const normalizedTerm = searchTerm.trim();
  const [debouncedTerm, setDebouncedTerm] = useState(normalizedTerm);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setDebouncedTerm(normalizedTerm),
      SEARCH_DEBOUNCE_MS,
    );
    return () => window.clearTimeout(timer);
  }, [normalizedTerm]);

  const ready = normalizedTerm.length >= MIN_SEARCH_LENGTH;
  const debouncedReady = debouncedTerm.length >= MIN_SEARCH_LENGTH;
  const query = useQuery({
    queryKey: ["pokemon-catalog-search"],
    queryFn: ({ signal }) => getPokemon(0, NATIONAL_DEX_LIMIT, signal),
    enabled: debouncedReady,
    ...queryPolicies.catalogSearch,
  });
  const state = useQueryState(query);
  const isCurrentSearchReady =
    ready && debouncedReady && debouncedTerm === normalizedTerm;

  return {
    results: state.data?.results || [],
    loading: ready && (!isCurrentSearchReady || state.loading),
    fetching: ready && (!isCurrentSearchReady || state.fetching),
    error: isCurrentSearchReady ? state.error : "",
    ready,
    retry: state.retry,
  };
};
