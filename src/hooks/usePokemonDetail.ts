import { useQuery } from "@tanstack/react-query";
import { getPokemonById, PokemonDex } from "../components/Services/IPokemon";

/**
 * Interface voor het resultaat van de usePokemonDetail hook
 */
interface UsePokemonDetailResult {
  /** De opgehaalde Pokémon detail data */
  pokemon: PokemonDex;
  /** Of de data nog wordt geladen */
  loading: boolean;
  /** Foutmelding indien er iets misging, of null bij geen fout */
  error: string | null;
}

/**
 * Custom hook voor het ophalen van gedetailleerde informatie over een specifieke Pokémon
 * gebruikmakend van TanStack Query voor caching en automatische refetching.
 *
 * @param pokemonId - Het ID van de Pokémon om details voor op te halen
 * @returns Object met pokemon detail data, loading state en error state
 *
 * @example
 * ```tsx
 * const { pokemon, loading, error } = usePokemonDetail(25); // Pikachu
 * ```
 */
export const usePokemonDetail = (pokemonId: number): UsePokemonDetailResult => {
  const {
    data: pokemon,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["pokemon-detail", pokemonId],
    queryFn: () => getPokemonById(pokemonId),
    enabled: pokemonId > 0, // Only run query if pokemonId is valid
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 30, // 30 minutes
  });

  return {
    pokemon: pokemon || ({} as PokemonDex),
    loading,
    error: error?.message || null,
  };
};
