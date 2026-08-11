import { createContext } from "react";
import type { FavoritePokemon } from "../components/Services/IPokemon";

export interface FavoritesContextType {
  favorites: FavoritePokemon[];
  addFavorite: (pokemon: FavoritePokemon) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const FavoritesContext = createContext<
  FavoritesContextType | undefined
>(undefined);
