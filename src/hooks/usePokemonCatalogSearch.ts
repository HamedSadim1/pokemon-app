import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPokemon, type Result } from "../components/Services/IPokemon";

interface UsePokemonCatalogSearchResult {
  results: Result[];
  loading: boolean;
  error: string;
  ready: boolean;
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
  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemon-catalog-search"],
    queryFn: ({ signal }) => getPokemon(0, NATIONAL_DEX_LIMIT, signal),
    enabled: debouncedReady,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });

  const isCurrentSearchReady = ready && debouncedReady && debouncedTerm === normalizedTerm;

  return {
    results: data?.results || [],
    loading: ready && (!isCurrentSearchReady || isLoading),
    error: isCurrentSearchReady ? error?.message || "" : "",
    ready,
  };
};
