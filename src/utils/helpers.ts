/**
 * Helper functies voor de Pokémon applicatie.
 * Bevat utility functies voor formatting, berekeningen en styling.
 */

/**
 * Formatteert een Pokémon ID naar een 3-cijferige string met voorloopnullen
 * @param id - Het Pokémon ID nummer
 * @returns Een 3-cijferige string representatie van het ID
 *
 * @example
 * ```typescript
 * formatPokemonId(25) // "025"
 * formatPokemonId(150) // "150"
 * ```
 */
export const formatPokemonId = (id: number): string => {
  return id.toString().padStart(3, "0");
};

/**
 * Berekent het totale aantal pagina's gebaseerd op totaal aantal items en items per pagina
 * @param totalItems - Totaal aantal items
 * @param itemsPerPage - Aantal items per pagina
 * @returns Totaal aantal pagina's
 *
 * @example
 * ```typescript
 * calculateTotalPages(150, 20) // 8
 * ```
 */
export const calculateTotalPages = (
  totalItems: number,
  itemsPerPage: number
): number => {
  return Math.ceil(totalItems / itemsPerPage);
};

/**
 * Maakt de eerste letter van een string hoofdletter
 * @param str - De string om te kapitaliseren
 * @returns De gekapitaliseerde string
 *
 * @example
 * ```typescript
 * capitalize("pikachu") // "Pikachu"
 * ```
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Haalt de achtergrond gradient classes op voor het thema
 * @param theme - Het huidige thema ("dark" | "light")
 * @returns Tailwind CSS achtergrond gradient classes
 *
 * @example
 * ```typescript
 * getBackgroundGradient("dark") // "bg-linear-to-br from-gray-900 via-purple-900 to-violet-900"
 * ```
 */
export const getBackgroundGradient = (theme: "dark" | "light"): string => {
  return theme === "dark"
    ? "bg-linear-to-br from-gray-900 via-purple-900 to-violet-900"
    : "bg-linear-to-br from-blue-400 via-purple-500 to-pink-500";
};

/**
 * Haalt de glassmorphism kaart classes op voor het thema
 * @param theme - Het huidige thema ("dark" | "light")
 * @returns Tailwind CSS glassmorphism classes
 *
 * @example
 * ```typescript
 * getGlassmorphismClasses("dark") // "bg-white/5 border-white/10 backdrop-blur-xl"
 * ```
 */
export const getGlassmorphismClasses = (theme: "dark" | "light"): string => {
  return theme === "dark"
    ? "bg-white/5 border-white/10 backdrop-blur-xl"
    : "bg-white/20 border-white/30 backdrop-blur-xl";
};

/**
 * Haalt de tekst kleur classes op voor primaire tekst
 * @param theme - Het huidige thema ("dark" | "light")
 * @returns Tailwind CSS tekst kleur classes
 *
 * @example
 * ```typescript
 * getPrimaryTextColor("dark") // "text-white"
 * ```
 */
export const getPrimaryTextColor = (theme: "dark" | "light"): string => {
  return theme === "dark" ? "text-white" : "text-gray-900";
};

/**
 * Haalt de tekst kleur classes op voor secundaire tekst
 * @param theme - Het huidige thema ("dark" | "light")
 * @returns Tailwind CSS tekst kleur classes
 *
 * @example
 * ```typescript
 * getSecondaryTextColor("dark") // "text-gray-300"
 * ```
 */
export const getSecondaryTextColor = (theme: "dark" | "light"): string => {
  return theme === "dark" ? "text-gray-300" : "text-gray-600";
};

/**
 * Haalt de accent kleur classes op voor highlights
 * @param theme - Het huidige thema ("dark" | "light")
 * @returns Tailwind CSS accent kleur classes
 *
 * @example
 * ```typescript
 * getAccentColor("dark") // "text-yellow-400"
 * ```
 */
export const getAccentColor = (theme: "dark" | "light"): string => {
  return theme === "dark" ? "text-yellow-400" : "text-blue-600";
};
