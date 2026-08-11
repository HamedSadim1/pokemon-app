import { describe, expect, it } from "vitest";
import { getEnglishText, getIdFromUrl } from "./pokemon";

describe("Pokémon data helpers", () => {
  it("extracts ids from API resource URLs", () => {
    expect(
      getIdFromUrl("https://pokeapi.co/api/v2/pokemon/25/", "pokemon"),
    ).toBe(25);
    expect(
      getIdFromUrl("https://pokeapi.co/api/v2/pokemon-species/1", "pokemon-species"),
    ).toBe(1);
    expect(getIdFromUrl("https://example.com/other/42", "pokemon")).toBe(0);
  });

  it("picks the English entry from localized lists", () => {
    const entries = [
      { language: { name: "fr" }, value: "un" },
      { language: { name: "en" }, value: "one" },
    ];
    expect(getEnglishText(entries)?.value).toBe("one");
    expect(getEnglishText(undefined)).toBeUndefined();
  });
});
