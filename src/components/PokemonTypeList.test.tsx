import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PokemonTypeList from "./PokemonTypeList";

describe("PokemonTypeList", () => {
  it("renders type pills", () => {
    render(<PokemonTypeList types={[{ type: { name: "fire" } }]} />);
    expect(screen.getByText("fire")).toHaveClass("type-pill", "type-fire");
  });

  it("renders no layout wrapper when types are unavailable", () => {
    const { container } = render(<PokemonTypeList />);
    expect(container.firstChild).toBeNull();
  });
});
