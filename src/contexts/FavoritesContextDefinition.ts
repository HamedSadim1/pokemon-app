import { createContext } from "react";

export interface Pokemon {
  id: number;
  name: string;
  sprites?: {
    front_default?: string;
  };
  types?: Array<{
    type?: {
      name?: string;
    };
  }>;
}

export interface FavoritesContextType {
  favorites: Pokemon[];
  addFavorite: (pokemon: Pokemon) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const FavoritesContext = createContext<
  FavoritesContextType | undefined
>(undefined);
