/**
 * Pokémon data and URL helpers.
 */

import { API_CONFIG, FORMAT_CONFIG } from "../config";

export const getEnglishText = <T extends { language: { name: string } }>(
  entries: T[] | undefined,
): T | undefined =>
  entries?.find((entry) => entry.language.name === FORMAT_CONFIG.englishLanguageName);

export const getPokemonArtworkUrl = (id: number): string =>
  `${API_CONFIG.artworkBaseUrl}/${id}.${API_CONFIG.imageExtension}`;

export const getPokemonSpriteUrl = (id: number): string =>
  `${API_CONFIG.spriteBaseUrl}/${id}.${API_CONFIG.imageExtension}`;

export type ApiResource = "pokemon" | "pokemon-species";

export const getIdFromUrl = (url: string, resource: ApiResource): number => {
  const match = url.match(new RegExp(`/${resource}/(\\d+)/?$`));
  return match ? Number.parseInt(match[1], 10) : 0;
};
