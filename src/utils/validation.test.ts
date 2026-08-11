import { describe, expect, it } from "vitest";
import { isPokemon, isPokemonList, isRecord } from "./validation";

describe("type guards", () => {
  it("recognizes records and rejects primitives", () => {
    expect(isRecord({})).toBe(true);
    expect(isRecord(null)).toBe(false);
    expect(isRecord("text")).toBe(false);
  });

  it("validates single favorite pokemon", () => {
    expect(isPokemon({ id: 25, name: "pikachu" })).toBe(true);
    expect(isPokemon({ id: 25 })).toBe(false);
    expect(isPokemon(null)).toBe(false);
  });

  it("validates favorite lists", () => {
    expect(isPokemonList([{ id: 1, name: "bulbasaur" }])).toBe(true);
    expect(isPokemonList([{ id: 1 }])).toBe(false);
    expect(isPokemonList("nope")).toBe(false);
  });
});
