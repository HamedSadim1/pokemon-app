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
import { queryPolicies } from "../query/queryClient";
import { useQueryState, type QueryState } from "./useQueryState";

interface UsePokemonDetailResult {
  pokemon: PokemonDex | null;
  species: PokemonSpecies | null;
  evolution: EvolutionChain | null;
  speciesUnavailable: boolean;
  evolutionUnavailable: boolean;
  loading: boolean;
  fetching: boolean;
  error: string | null;
  retry: QueryState<{
    pokemon: PokemonDex;
    species: PokemonSpecies | null;
    evolution: EvolutionChain | null;
    speciesUnavailable: boolean;
    evolutionUnavailable: boolean;
  }>["retry"];
}

export const usePokemonDetail = (pokemonId: number): UsePokemonDetailResult => {
  const query = useQuery({
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
    ...queryPolicies.pokemonDetail,
  });
  const state = useQueryState(query);

  return {
    pokemon: state.data?.pokemon || null,
    species: state.data?.species || null,
    evolution: state.data?.evolution || null,
    speciesUnavailable: state.data?.speciesUnavailable || false,
    evolutionUnavailable: state.data?.evolutionUnavailable || false,
    loading: state.loading,
    fetching: state.fetching,
    error: state.error || null,
    retry: state.retry,
  };
};
