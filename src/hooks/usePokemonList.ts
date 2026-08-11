import { useQuery } from "@tanstack/react-query";
import { getPokemon, type PokemonResult } from "../components/Services/IPokemon";
import { useQueryState, type QueryState } from "./useQueryState";

interface UsePokemonListResult {
  pokemon: PokemonResult;
  loading: boolean;
  fetching: boolean;
  error: string;
  retry: QueryState<PokemonResult>["retry"];
}

export const usePokemonList = (
  currentPage: number,
  itemsPerPage: number = 20,
  enabled = true,
): UsePokemonListResult => {
  const offset = currentPage * itemsPerPage - itemsPerPage;
  const query = useQuery({
    queryKey: ["pokemon-list", currentPage, itemsPerPage],
    queryFn: ({ signal }) => getPokemon(offset, itemsPerPage, signal),
    enabled,
  });
  const state = useQueryState(query);

  return {
    pokemon: state.data || ({} as PokemonResult),
    loading: state.loading,
    fetching: state.fetching,
    error: state.error,
    retry: state.retry,
  };
};
