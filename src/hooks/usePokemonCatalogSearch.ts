import { useQuery } from "@tanstack/react-query";
import { getPokemon, type Result } from "../components/Services/IPokemon";

interface UsePokemonCatalogSearchResult {
  results: Result[];
  loading: boolean;
  error: string;
}

const NATIONAL_DEX_LIMIT = 1025;

export const usePokemonCatalogSearch = (
  searchTerm: string
): UsePokemonCatalogSearchResult => {
  const activeSearch = searchTerm.trim().length > 0;
  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemon-catalog-search"],
    queryFn: () => getPokemon(0, NATIONAL_DEX_LIMIT),
    enabled: activeSearch,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });

  return {
    results: data?.results || [],
    loading: activeSearch && isLoading,
    error: error?.message || "",
  };
};
