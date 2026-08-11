import React, { useEffect, useState } from "react";
import {
  FavoritesContext,
  type Pokemon,
} from "./FavoritesContextDefinition";
import { readStorage, writeStorage } from "../utils/storage";

const isPokemon = (value: unknown): value is Pokemon => {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<Pokemon>;
  return typeof candidate.id === "number" && typeof candidate.name === "string";
};

const isPokemonList = (value: unknown): value is Pokemon[] =>
  Array.isArray(value) && value.every(isPokemon);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Pokemon[]>(() =>
    readStorage("pokemon-favorites", [], isPokemonList),
  );

  useEffect(() => {
    writeStorage("pokemon-favorites", favorites);
  }, [favorites]);

  const addFavorite = (pokemon: Pokemon) => {
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
