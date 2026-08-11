/**
 * Helper functies voor de Pokémon applicatie.
 * Bevat utility functies voor formatting, berekeningen en styling.
 */

export const formatPokemonId = (id: number): string => {
  return id.toString().padStart(3, "0");
};

export const calculateTotalPages = (
  totalItems: number,
  itemsPerPage: number
): number => {
  return Math.ceil(totalItems / itemsPerPage);
};

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getPokemonArtworkUrl = (id: number): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export const getPokemonSpriteUrl = (id: number): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

export const getPokemonIdFromUrl = (url: string): number => {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  return match ? Number.parseInt(match[1], 10) : 0;
};

export const getBackgroundGradient = (theme: "dark" | "light"): string => {
  return theme === "dark"
    ? "bg-linear-to-br from-gray-900 via-purple-900 to-violet-900"
    : "bg-linear-to-br from-blue-400 via-purple-500 to-pink-500";
};

export const getGlassmorphismClasses = (theme: "dark" | "light"): string => {
  return theme === "dark"
    ? "bg-white/5 border-white/10 backdrop-blur-xl"
    : "bg-white/20 border-white/30 backdrop-blur-xl";
};

export const getPrimaryTextColor = (theme: "dark" | "light"): string => {
  return theme === "dark" ? "text-white" : "text-gray-900";
};

export const getSecondaryTextColor = (theme: "dark" | "light"): string => {
  return theme === "dark" ? "text-gray-300" : "text-gray-600";
};

export const getAccentColor = (theme: "dark" | "light"): string => {
  return theme === "dark" ? "text-yellow-400" : "text-blue-600";
};
