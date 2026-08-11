import { useQuery } from "@tanstack/react-query";
import {
  getEvolutionChain,
  getPokemonById,
  getPokemonSpecies,
  type EvolutionChain,
  type PokemonDex,
  type PokemonSpecies,
} from "../components/Services/IPokemon";

interface UsePokemonDetailResult {
  pokemon: PokemonDex | null;
  species: PokemonSpecies | null;
  evolution: EvolutionChain | null;
  loading: boolean;
  error: string | null;
}

export const usePokemonDetail = (pokemonId: number): UsePokemonDetailResult => {
  const { data, isLoading: loading, error } = useQuery({
    queryKey: ["pokemon-detail", pokemonId],
    queryFn: async () => {
      const [pokemon, speciesResult] = await Promise.all([
        getPokemonById(pokemonId),
        getPokemonSpecies(pokemonId).catch(() => null),
      ]);
      const evolution = speciesResult?.evolution_chain?.url
        ? await getEvolutionChain(speciesResult.evolution_chain.url).catch(() => null)
        : null;

      return { pokemon, species: speciesResult, evolution };
    },
    enabled: pokemonId > 0,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });

  return {
    pokemon: data?.pokemon || null,
    species: data?.species || null,
    evolution: data?.evolution || null,
    loading,
    error: error?.message || null,
  };
};
