import { useQuery } from "@tanstack/react-query";
import {
  getEvolutionChain,
  getPokemonById,
  getPokemonSpecies,
  isPokemonRequestCancellation,
  type EvolutionChain,
  type PokemonDex,
  type PokemonSpecies,
} from "../components/Services/IPokemon";

interface UsePokemonDetailResult {
  pokemon: PokemonDex | null;
  species: PokemonSpecies | null;
  evolution: EvolutionChain | null;
  speciesUnavailable: boolean;
  evolutionUnavailable: boolean;
  loading: boolean;
  error: string | null;
}

export const usePokemonDetail = (pokemonId: number): UsePokemonDetailResult => {
  const { data, isLoading: loading, error } = useQuery({
    queryKey: ["pokemon-detail", pokemonId],
    queryFn: async ({ signal }) => {
      const pokemon = await getPokemonById(pokemonId, signal);
      let species: PokemonSpecies | null = null;
      let speciesUnavailable = false;

      try {
        species = await getPokemonSpecies(pokemonId, signal);
      } catch (speciesError) {
        if (isPokemonRequestCancellation(speciesError)) throw speciesError;
        speciesUnavailable = true;
      }

      let evolution: EvolutionChain | null = null;
      let evolutionUnavailable = false;

      if (species?.evolution_chain?.url) {
        try {
          evolution = await getEvolutionChain(species.evolution_chain.url, signal);
        } catch (evolutionError) {
          if (isPokemonRequestCancellation(evolutionError)) throw evolutionError;
          evolutionUnavailable = true;
        }
      }

      return {
        pokemon,
        species,
        evolution,
        speciesUnavailable,
        evolutionUnavailable,
      };
    },
    enabled: pokemonId > 0,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });

  return {
    pokemon: data?.pokemon || null,
    species: data?.species || null,
    evolution: data?.evolution || null,
    speciesUnavailable: data?.speciesUnavailable || false,
    evolutionUnavailable: data?.evolutionUnavailable || false,
    loading,
    error: error?.message || null,
  };
};
