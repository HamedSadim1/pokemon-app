import { useState, useMemo } from "react";
import { Result } from "../components/Services/IPokemon";

/**
 * Interface voor het resultaat van de usePokemonSearch hook
 */
interface UsePokemonSearchResult {
  /** De huidige zoekterm */
  searchTerm: string;
  /** Functie om de zoekterm bij te werken */
  setSearchTerm: (term: string) => void;
  /** Gefilterde lijst met Pokémon gebaseerd op de zoekterm */
  filteredResults: Result[];
}

/**
 * Custom hook voor het filteren van een Pokémon lijst gebaseerd op een zoekterm.
 * Gebruikt useMemo voor performance optimalisatie zodat filtering alleen gebeurt
 * wanneer de pokemonList of searchTerm verandert.
 *
 * @param pokemonList - De lijst met Pokémon om doorheen te zoeken
 * @returns Object met searchTerm, setSearchTerm functie en gefilterde resultaten
 *
 * @example
 * ```tsx
 * const { searchTerm, setSearchTerm, filteredResults } = usePokemonSearch(pokemonList);
 * ```
 */
export const usePokemonSearch = (
  pokemonList: Result[]
): UsePokemonSearchResult => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredResults = useMemo(() => {
    if (!searchTerm.trim()) return pokemonList;

    return pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [pokemonList, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredResults,
  };
};
