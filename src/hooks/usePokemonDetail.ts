import { useQuery } from "@tanstack/react-query";
import {
  type EvolutionChain,
  type PokemonDex,
  type PokemonSpecies,
} from "@/components/Services/IPokemon";
import { pokemonDetailOptions, type PokemonDetailData } from "@/query";
import { useQueryState, type QueryState } from "./useQueryState";

interface UsePokemonDetailResult {
  pokemon: PokemonDex | null;
  species: PokemonSpecies | null;
  evolution: EvolutionChain | null;
  speciesUnavailable: boolean;
  evolutionUnavailable: boolean;
  loading: boolean;
  fetching: boolean;
  placeholder: boolean;
  error: string | null;
  retry: QueryState<PokemonDetailData>["retry"];
}

export const usePokemonDetail = (pokemonId: number): UsePokemonDetailResult => {
  const query = useQuery(pokemonDetailOptions(pokemonId));
  const state = useQueryState(query);

  return {
    pokemon: state.data?.pokemon || null,
    species: state.data?.species || null,
    evolution: state.data?.evolution || null,
    speciesUnavailable: state.data?.speciesUnavailable || false,
    evolutionUnavailable: state.data?.evolutionUnavailable || false,
    loading: state.loading,
    fetching: state.fetching,
    placeholder: state.placeholder,
    error: state.error || null,
    retry: state.retry,
  };
};
