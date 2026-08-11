import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import { FavoritesContext } from "../contexts/FavoritesContextDefinition";
import type { Pokemon } from "../contexts/FavoritesContextDefinition";
import type { Result } from "./Services/IPokemon";

const pokemon: Pokemon = {
  id: 25,
  name: "pikachu",
  types: [{ type: { name: "electric" } }],
  sprites: { front_default: "/pikachu.png" },
};

const catalogPokemon: Result = {
  name: "pikachu",
  url: "https://pokeapi.co/api/v2/pokemon/25/",
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
