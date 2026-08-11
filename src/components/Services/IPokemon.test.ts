import { afterEach, describe, expect, it, vi } from "vitest";
import axios from "axios";
import { API_CONFIG } from "../../config";
import {
  getEvolutionChain,
  getPokemon,
  getPokemonById,
  getPokemonSpecies,
} from "./IPokemon";

describe("Pokémon service validation", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });
  it("rejects malformed list responses", async () => {
    vi.spyOn(axios, "get").mockResolvedValueOnce({
      data: { count: 1, results: [{ name: "pikachu" }] },
    });

    await expect(getPokemon()).rejects.toThrow("Invalid Pokémon list response");
  });

  it("rejects malformed detail responses", async () => {
    vi.spyOn(axios, "get").mockResolvedValueOnce({
      data: { id: 25, name: "pikachu" },
    });

    await expect(getPokemonById(25)).rejects.toThrow("Invalid Pokémon detail response");
  });

  it("rejects malformed species responses", async () => {
    vi.spyOn(axios, "get").mockResolvedValueOnce({
      data: { id: 25, name: "pikachu", evolution_chain: { url: 25 } },
    });

    await expect(getPokemonSpecies(25)).rejects.toThrow("Invalid Pokémon species response");
  });

  it("rejects evolution-chain URLs outside the PokeAPI origin", async () => {
    await expect(
      getEvolutionChain("https://example.com/api/v2/evolution-chain/1"),
    ).rejects.toThrow("Invalid evolution chain URL");
  });

  it("rejects malformed evolution-chain responses", async () => {
    vi.spyOn(axios, "get").mockResolvedValueOnce({
      data: { id: 1, chain: { species: { name: "bulbasaur" } } },
    });

    await expect(
      getEvolutionChain(`${API_CONFIG.pokeApiBaseUrl}/evolution-chain/1`),
    ).rejects.toThrow("Invalid evolution chain response");
  });
});
