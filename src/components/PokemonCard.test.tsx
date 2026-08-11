import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import { FavoritesContext } from "../contexts";
import type { FavoritePokemon, Result } from "./Services/IPokemon";
import { API_CONFIG } from "../config";

const pokemon: FavoritePokemon = {
  id: 25,
  name: "pikachu",
  types: [{ type: { name: "electric", url: `${API_CONFIG.pokeApiBaseUrl}/type/13/` } }],
  sprites: { front_default: "/pikachu.png" },
};

const catalogPokemon: Result = {
  name: "pikachu",
  url: `${API_CONFIG.pokeApiBaseUrl}/pokemon/25/`,
};

const renderCard = (action: "favorite-toggle" | "remove") =>
  render(
    <MemoryRouter>
      <FavoritesContext.Provider
        value={{
          favorites: action === "remove" ? [pokemon] : [],
          addFavorite: vi.fn(),
          removeFavorite: vi.fn(),
          isFavorite: () => action === "remove",
        }}
      >
        {action === "remove" ? (
          <PokemonCard pokemon={pokemon} id={25} variant="favorite" action="remove" />
        ) : (
          <PokemonCard pokemon={catalogPokemon} id={25} variant="catalog" action="favorite-toggle" />
        )}
      </FavoritesContext.Provider>
    </MemoryRouter>,
  );

describe("PokemonCard", () => {
  it("renders the catalog favorite action", () => {
    renderCard("favorite-toggle");
    expect(screen.getByRole("button", { name: /add pikachu to favorites/i })).toBeInTheDocument();
    expect(screen.getByText("#0025")).toBeInTheDocument();
  });

  it("renders the reusable remove action for favorites", () => {
    renderCard("remove");
    expect(screen.getByRole("button", { name: /remove pikachu from favorites/i })).toBeInTheDocument();
    expect(screen.getByText("electric")).toBeInTheDocument();
  });
});
