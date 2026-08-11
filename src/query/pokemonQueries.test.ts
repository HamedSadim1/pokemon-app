import { describe, expect, it } from "vitest";
import {
  pokemonCatalogOptions,
  pokemonListOptions,
  pokemonQueryKeys,
} from "./pokemonQueries";

describe("Pokémon query options", () => {
  it("creates deterministic hierarchical keys with all list inputs", () => {
    expect(pokemonQueryKeys.list(2, 20)).toEqual([
      "pokemon",
      "list",
      { page: 2, limit: 20 },
    ]);
    expect(pokemonQueryKeys.list(1, 20)).not.toEqual(
      pokemonQueryKeys.list(2, 20),
    );
  });

  it("keeps previous list data while a new page is fetched", () => {
    const options = pokemonListOptions(2, 20);

    expect(options.placeholderData).toBeTypeOf("function");
    expect(options.queryKey).toEqual(pokemonQueryKeys.list(2, 20));
  });

  it("uses a stable catalog key for cache reuse", () => {
    expect(pokemonCatalogOptions().queryKey).toEqual(pokemonQueryKeys.catalog());
  });
});
