import React from "react";
import { FavoritesContext } from "./FavoritesContextDefinition";
import type { FavoritePokemon } from "../components/Services/IPokemon";
import { usePersistentState } from "../hooks/usePersistentState";
import { isPokemonList } from "../utils";
import { STORAGE_KEYS } from "../config";

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = usePersistentState(
    STORAGE_KEYS.favorites,
    [],
    isPokemonList,
  );

  const addFavorite = (pokemon: FavoritePokemon) => {
    setFavorites((prev) => {
      if (prev.find((fav) => fav.id === pokemon.id)) {
        return prev;
      }
      return [...prev, pokemon];
    });
  };

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  };

  const isFavorite = (id: number) => favorites.some((fav) => fav.id === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
