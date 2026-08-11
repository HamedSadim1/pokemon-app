/**
 * Formatting helpers for numbers, slugs and CSS classes.
 */

import { FORMAT_CONFIG } from "../config";

export const formatPokemonId = (id: number, width: number = FORMAT_CONFIG.idWidth): string =>
  String(id).padStart(width, FORMAT_CONFIG.paddingCharacter);

export const formatDexNumber = (id: number, width: number = FORMAT_CONFIG.dexNumberWidth): string =>
  `${FORMAT_CONFIG.dexNumberPrefix}${formatPokemonId(id, width)}`;

export const humanizeSlug = (
  value: string | undefined,
  fallback: string = FORMAT_CONFIG.fallbackDash,
): string =>
  value?.split(FORMAT_CONFIG.slugSeparator).join(FORMAT_CONFIG.slugReplacement) ||
  fallback;

export const getPokemonTypeClass = (type?: string): string =>
  `${FORMAT_CONFIG.typePillClassPrefix}${type?.toLowerCase() || FORMAT_CONFIG.defaultTypeClass}`;
