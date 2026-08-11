import { useQuery } from "@tanstack/react-query";
import { type PokemonResult } from "../components/Services/IPokemon";
import { pokemonListOptions } from "../query";
import { useQueryState, type QueryState } from "./useQueryState";
import { POKEMON_CONFIG } from "../config";

interface UsePokemonListResult {
  pokemon: PokemonResult;
  loading: boolean;
  fetching: boolean;
  placeholder: boolean;
  error: string;
  retry: QueryState<PokemonResult>["retry"];
}

export const usePokemonList = (
  currentPage: number,
  itemsPerPage: number = POKEMON_CONFIG.itemsPerPage,
  enabled = true,
): UsePokemonListResult => {
  const query = useQuery({
    ...pokemonListOptions(currentPage, itemsPerPage),
    enabled,
  });
  const state = useQueryState(query);

  return {
    pokemon: state.data || ({} as PokemonResult),
    loading: state.loading,
    fetching: state.fetching,
    placeholder: state.placeholder,
    error: state.error,
    retry: state.retry,
  };
};
