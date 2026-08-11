import {
  keepPreviousData,
  queryOptions,
} from "@tanstack/react-query";
import {
  getEvolutionChain,
  getPokemon,
  getPokemonById,
  getPokemonSpecies,
  type EvolutionChain,
  type PokemonDex,
  type PokemonResult,
  type PokemonSpecies,
} from "../components/Services/IPokemon";
import { queryPolicies } from "./queryClient";
import { POKEMON_CONFIG } from "../config";
import { isRequestCancellation } from "../utils";

export const pokemonQueryKeys = {
  all: ["pokemon"] as const,
  lists: () => [...pokemonQueryKeys.all, "list"] as const,
  list: (page: number, limit: number) =>
    [...pokemonQueryKeys.lists(), { page, limit }] as const,
  catalog: () => [...pokemonQueryKeys.all, "catalog"] as const,
  details: () => [...pokemonQueryKeys.all, "detail"] as const,
  detail: (id: number) => [...pokemonQueryKeys.details(), id] as const,
};

export const pokemonListOptions = (page: number, limit: number) =>
  queryOptions<PokemonResult>({
    queryKey: pokemonQueryKeys.list(page, limit),
    queryFn: ({ signal }) => getPokemon((page - 1) * limit, limit, signal),
    placeholderData: keepPreviousData,
  });

export const pokemonCatalogOptions = () =>
  queryOptions<PokemonResult>({
    queryKey: pokemonQueryKeys.catalog(),
    // Volledige catalogus (alle soorten én vormen) zodat client-side zoeken alles dekt.
    queryFn: ({ signal }) => getPokemon(0, POKEMON_CONFIG.maxCatalogFetchLimit, signal),
    ...queryPolicies.catalogSearch,
  });

export interface PokemonDetailData {
  pokemon: PokemonDex;
  species: PokemonSpecies | null;
  evolution: EvolutionChain | null;
  speciesUnavailable: boolean;
  evolutionUnavailable: boolean;
}

export const pokemonDetailOptions = (pokemonId: number) =>
  queryOptions<PokemonDetailData>({
    queryKey: pokemonQueryKeys.detail(pokemonId),
    queryFn: async ({ signal }) => {
      const pokemon = await getPokemonById(pokemonId, signal);
      let species: PokemonSpecies | null = null;
      let speciesUnavailable = false;

      try {
        species = await getPokemonSpecies(pokemonId, signal);
      } catch (speciesError) {
        if (isRequestCancellation(speciesError)) throw speciesError;
        speciesUnavailable = true;
      }

      let evolution: EvolutionChain | null = null;
      let evolutionUnavailable = false;

      if (species?.evolution_chain?.url) {
        try {
          evolution = await getEvolutionChain(species.evolution_chain.url, signal);
        } catch (evolutionError) {
          if (isRequestCancellation(evolutionError)) throw evolutionError;
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
