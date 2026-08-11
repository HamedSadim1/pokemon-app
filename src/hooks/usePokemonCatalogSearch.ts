import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { pokemonCatalogOptions } from "../query";
import { type PokemonResult, type Result } from "../components/Services/IPokemon";
import { useQueryState, type QueryState } from "./useQueryState";
import { SEARCH_CONFIG } from "../config";

interface UsePokemonCatalogSearchResult {
  results: Result[];
  loading: boolean;
  fetching: boolean;
  placeholder: boolean;
  error: string;
  ready: boolean;
  retry: QueryState<PokemonResult>["retry"];
}

export const usePokemonCatalogSearch = (
  searchTerm: string,
): UsePokemonCatalogSearchResult => {
  const normalizedTerm = searchTerm.trim();
  const [debouncedTerm, setDebouncedTerm] = useState(normalizedTerm);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setDebouncedTerm(normalizedTerm),
      SEARCH_CONFIG.debounceMs,
    );
    return () => window.clearTimeout(timer);
  }, [normalizedTerm]);

  const ready = normalizedTerm.length >= SEARCH_CONFIG.minLength;
  const debouncedReady = debouncedTerm.length >= SEARCH_CONFIG.minLength;
  const query = useQuery({
    ...pokemonCatalogOptions(),
    enabled: debouncedReady,
  });
  const state = useQueryState(query);
  const isCurrentSearchReady =
    ready && debouncedReady && debouncedTerm === normalizedTerm;

  return {
    results: state.data?.results || [],
    loading: ready && (!isCurrentSearchReady || state.loading),
    fetching: ready && (!isCurrentSearchReady || state.fetching),
    placeholder: state.placeholder,
    error: isCurrentSearchReady ? state.error : "",
    ready,
    retry: state.retry,
  };
};
