import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  it("provides stable form identification attributes", () => {
    render(<SearchBar value="" onChange={vi.fn()} />);

    const input = screen.getByRole("searchbox", { name: "Search Pokémon" });

    expect(input).toHaveAttribute("id", "pokemon-search");
    expect(input).toHaveAttribute("name", "pokemon-search");
  });
});
