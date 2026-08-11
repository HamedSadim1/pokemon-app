import { useQuery } from "@tanstack/react-query";
import { getPokemon, PokemonResult } from "../components/Services/IPokemon";

/**
 * Interface voor het resultaat van de usePokemonList hook
 */
interface UsePokemonListResult {
  /** De opgehaalde Pokémon data */
  pokemon: PokemonResult;
  /** Of de data nog wordt geladen */
  loading: boolean;
  /** Foutmelding indien er iets misging */
  error: string;
}

/**
 * Custom hook voor het ophalen van een lijst met Pokémon gebruikmakend van TanStack Query
 * voor automatische caching, background refetching en error handling.
 *
 * @param currentPage - De huidige pagina nummer (1-based)
 * @param itemsPerPage - Aantal Pokémon per pagina (default: 20)
 * @returns Object met pokemon data, loading state en error state
 *
 * @example
 * ```tsx
 * const { pokemon, loading, error } = usePokemonList(1, 20);
 * ```
 */
export const usePokemonList = (
  currentPage: number,
  itemsPerPage: number = 20,
  enabled = true
): UsePokemonListResult => {
  const offset = currentPage * itemsPerPage - itemsPerPage;

  const {
    data: pokemon,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["pokemon-list", currentPage, itemsPerPage],
    queryFn: () => getPokemon(offset, itemsPerPage),
    enabled,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });

  return {
    pokemon: pokemon || ({} as PokemonResult),
    loading,
    error: error?.message || "",
  };
};
