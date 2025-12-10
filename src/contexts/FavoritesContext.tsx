import React, { createContext, useContext, useState, useEffect } from "react";

interface Pokemon {
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

interface FavoritesContextType {
  favorites: Pokemon[];
  addFavorite: (pokemon: Pokemon) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("pokemon-favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pokemon-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (pokemon: Pokemon) => {
    setFavorites((prev) => {
      if (prev.find((fav) => fav.id === pokemon.id)) {
        return prev; // Already in favorites
      }
      return [...prev, pokemon];
    });
  };

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  };

  const isFavorite = (id: number) => {
    return favorites.some((fav) => fav.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
