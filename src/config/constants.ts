export const POKEMON_CONFIG = {
  /**
   * Baseline/fallback voor het aantal PokeAPI-entries (soorten + vormen).
   * De live API-count (pokemon.count) is de bron van waarheid in de app;
   * deze waarde wordt enkel getoond vóór de eerste list-response binnen is.
   */
  totalSpecies: 1351,
  /** Maximale limit voor de volledige catalogus-fetch (PokeAPI staat tot 100000 toe). */
  maxCatalogFetchLimit: 100000,
  itemsPerPage: 20,
  featuredPokemonId: 25,
  visibleMoves: 16,
  /** Aantal type-pills dat op een kaart zichtbaar is. */
  cardVisibleTypes: 2,
  maxBaseStat: 255,
  /** Aantal type families (incl. default-token in tokens.css). */
  typeCount: 18,
} as const;

/**
 * Lost de actuele species-count op: de live API-count indien bekend,
 * anders de baseline uit POKEMON_CONFIG (bijv. tijdens het laden).
 */
export const resolveTotalSpecies = (liveCount: number | null | undefined): number =>
  liveCount || POKEMON_CONFIG.totalSpecies;

export const SEARCH_CONFIG = {
  minLength: 2,
  debounceMs: 250,
} as const;

export const API_CONFIG = {
  pokeApiBaseUrl: "https://pokeapi.co/api/v2",
  pokeApiOrigin: "https://pokeapi.co",
  pokeApiWebsite: "https://pokeapi.co/",
  spriteBaseUrl:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon",
  artworkBaseUrl:
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork",
  /** Extensie van sprite/artwork-bestanden. */
  imageExtension: "png",
  /** Vereist protocol voor externe PokeAPI-URL's (getEvolutionChain). */
  secureProtocol: "https:",
  /** Padpatroon van evolution-chain-URL's die de app accepteert. */
  evolutionChainPathPattern: /^\/api\/v2\/evolution-chain\/\d+\/?$/,
} as const;

export const QUERY_CONFIG = {
  maxRetries: 2,
  retryDelayBaseMs: 1000,
  retryDelayMaxMs: 30_000,
  defaultStaleTimeMs: 5 * 60 * 1000,
  defaultGcTimeMs: 10 * 60 * 1000,
  catalogStaleTimeMs: 30 * 60 * 1000,
  catalogGcTimeMs: 60 * 60 * 1000,
  detailStaleTimeMs: 10 * 60 * 1000,
  detailGcTimeMs: 30 * 60 * 1000,
} as const;

export const ICON_CONFIG = {
  defaultSize: 18,
  defaultStrokeWidth: 1.9,
  viewBoxSize: 24,
  /** Semantische icon-groottes, benoemd naar hun context. */
  sizes: {
    inline: 14,
    small: 16,
    button: 17,
    medium: 20,
    large: 24,
    hero: 28,
  },
} as const;

export const FORMAT_CONFIG = {
  /** Padding-breedte voor een National Dex nummer zonder '#'. */
  idWidth: 3,
  /** Padding-breedte voor de '#xxxx'-notatie op kaarten en detailpagina. */
  dexNumberWidth: 4,
  dexNumberPrefix: "#",
  /** Opvulkarakter voor genummerde weergaven. */
  paddingCharacter: "0",
  slugSeparator: "-",
  slugReplacement: " ",
  listSeparator: ", ",
  generationPrefix: "Gen ",
  generationSlugPrefix: "generation-",
  fallbackDash: "—",
  fallbackUnknown: "Unknown",
  englishLanguageName: "en",
  typePillClassPrefix: "type-pill type-",
  defaultTypeClass: "default",
  percentMax: 100,
} as const;

export const ERROR_CONFIG = {
  /** Prefix van alle validatie-foutmeldingen (gebruikt door queryClient + IPokemon). */
  invalidDataPrefix: "Invalid ",
  defaultMessage: "Request failed",
  /** Foutnamen die op een geannuleerde request wijzen. */
  cancellationNames: ["AbortError", "CanceledError"] as const,
  /** Client-fouten (4xx) worden niet opnieuw geprobeerd. */
  clientErrorMinStatus: 400,
  clientErrorMaxStatus: 500,
  messages: {
    invalidList: "Invalid Pokémon list response",
    invalidDetail: "Invalid Pokémon detail response",
    invalidSpecies: "Invalid Pokémon species response",
    invalidEvolutionChain: "Invalid evolution chain response",
    invalidEvolutionChainUrl: "Invalid evolution chain URL",
  },
} as const;

export const SKELETON_CONFIG = {
  /** Aantal beschrijvingsregels in het detail-skelet. */
  descriptionLines: 4,
  measureCount: 4,
  metadataCount: 4,
  abilityChips: 4,
  evolutionSteps: 3,
  statRows: 6,
} as const;

export const KEYBOARD_CONFIG = {
  escapeKey: "Escape",
} as const;

/** Gedeelde UI-teksten die op meerdere plekken gebruikt worden. */
export const UI_COPY = {
  shared: {
    tryAgain: "Try again",
    openPokedex: "Open Pokédex",
    swipeHint: "Swipe to view the full path",
  },
  navigation: {
    primaryLabel: "Primary navigation",
    mobileLabel: "Mobile navigation",
    footerLabel: "Footer navigation",
    openMenuLabel: "Open navigation",
    closeMenuLabel: "Close navigation",
    switchThemeLabel: (theme: string) => `Switch to ${theme} theme`,
  },
  pagination: {
    navLabel: "Pokémon list pagination",
    previousLabel: "Previous page",
    nextLabel: "Next page",
  },
  search: {
    clearLabel: "Clear search",
  },
  detail: {
    emptyAbilities: "No abilities listed",
    emptyMoves: "No moves listed",
    emptyStats: "No stats listed",
    emptyEvolution: "No evolution path listed",
  },
  favorites: {
    collectionKicker: "Your collection",
  },
  loading: {
    pokemonList: "Loading Pokémon list",
    pokedex: "Loading the Pokédex",
    profile: "Loading Pokémon profile",
    spinner: "Loading Pokémon...",
    routeFallback: "Loading Pokédex...",
    searchingCatalog: "Searching the full Pokédex",
    listMessage: "Loading the Pokémon list",
  },
} as const;

export const RESPONSIVE_CONFIG = {
  mobileBreakpointPx: 768,
} as const;

export const STORAGE_KEYS = {
  theme: "theme",
  favorites: "pokemon-favorites",
} as const;

export const ROUTES = {
  home: "/",
  pokedex: "/pokemon",
  /** Route-patroon voor de detailpagina (gebruikt in de routetabel). */
  pokedexDetail: "/pokemon/:id",
  favorites: "/favorites",
  /** Bouwt een concreet pad naar een detailpagina. */
  pokemonDetail: (id: number | string) => `/pokemon/${id}`,
} as const;

/** Legacy (hoofdlettergevoelige) redirect-paden, relatief aan de root-route. */
export const LEGACY_ROUTES = {
  pokedex: "Pokemon",
  pokedexDetail: "Pokemon/:id",
} as const;

export interface NavItem {
  to: string;
  label: string;
  end?: boolean;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { to: ROUTES.home, label: "Home", end: true },
  { to: ROUTES.pokedex, label: "Pokédex" },
  { to: ROUTES.favorites, label: "Favorites" },
];
