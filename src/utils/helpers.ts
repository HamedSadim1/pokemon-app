/**
 * Shared helpers for Pokémon data formatting and presentation.
 */

export const formatPokemonId = (id: number, width = 3): string =>
  String(id).padStart(width, "0");

export const formatDexNumber = (id: number, width = 4): string =>
  `#${formatPokemonId(id, width)}`;

export const calculateTotalPages = (
  totalItems: number,
  itemsPerPage: number,
): number => Math.ceil(totalItems / itemsPerPage);

export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const humanizeSlug = (
  value: string | undefined,
  fallback = "—",
): string => value?.replace(/-/g, " ") || fallback;

export const getPokemonTypeClass = (type?: string): string =>
  `type-pill type-${type?.toLowerCase() || "default"}`;

export const getPokemonArtworkUrl = (id: number): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export const getPokemonSpriteUrl = (id: number): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

export const getPokemonIdFromUrl = (url: string): number => {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  return match ? Number.parseInt(match[1], 10) : 0;
};

export const getBackgroundGradient = (theme: "dark" | "light"): string =>
  theme === "dark"
    ? "bg-linear-to-br from-gray-900 via-purple-900 to-violet-900"
    : "bg-linear-to-br from-blue-400 via-purple-500 to-pink-500";

export const getGlassmorphismClasses = (theme: "dark" | "light"): string =>
  theme === "dark"
    ? "bg-white/5 border-white/10 backdrop-blur-xl"
    : "bg-white/20 border-white/30 backdrop-blur-xl";

export const getPrimaryTextColor = (theme: "dark" | "light"): string =>
  theme === "dark" ? "text-white" : "text-gray-900";

export const getSecondaryTextColor = (theme: "dark" | "light"): string =>
  theme === "dark" ? "text-gray-300" : "text-gray-600";

export const getAccentColor = (theme: "dark" | "light"): string =>
  theme === "dark" ? "text-yellow-400" : "text-blue-600";
