/**
 * Shared runtime type guards and value validators.
 */

import type { FavoritePokemon } from "../components/Services/IPokemon";

export const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export const isPokemon = (value: unknown): value is FavoritePokemon => {
  if (!isRecord(value)) return false;

  const candidate = value as Partial<FavoritePokemon>;
  return typeof candidate.id === "number" && typeof candidate.name === "string";
};

export const isPokemonList = (value: unknown): value is FavoritePokemon[] =>
  Array.isArray(value) && value.every(isPokemon);
