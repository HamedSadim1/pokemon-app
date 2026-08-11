import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  API_CONFIG,
  ERROR_CONFIG,
  FORMAT_CONFIG,
  ICON_CONFIG,
  KEYBOARD_CONFIG,
  LEGACY_ROUTES,
  NAV_ITEMS,
  POKEMON_CONFIG,
  QUERY_CONFIG,
  RESPONSIVE_CONFIG,
  ROUTES,
  SEARCH_CONFIG,
  SKELETON_CONFIG,
  STORAGE_KEYS,
  UI_COPY,
  resolveTotalSpecies,
} from "./constants";
import { THEME_COLOR_VARIABLES } from "@/utils";

describe("application constants", () => {
  it("keeps domain and search settings coherent", () => {
    expect(POKEMON_CONFIG.totalSpecies).toBeGreaterThan(0);
    expect(POKEMON_CONFIG.itemsPerPage).toBeGreaterThan(0);
    expect(SEARCH_CONFIG.minLength).toBeGreaterThan(0);
    expect(SEARCH_CONFIG.debounceMs).toBeGreaterThan(0);
    // De catalogus-fetch moet altijd ruim over alle entries heen gaan,
    // zodat zoeken ook soorten/vormen na de baseline dekt.
    expect(POKEMON_CONFIG.maxCatalogFetchLimit).toBeGreaterThan(
      POKEMON_CONFIG.totalSpecies,
    );
  });

  it("keeps format rules explicit", () => {
    expect(FORMAT_CONFIG.idWidth).toBeGreaterThan(0);
    expect(FORMAT_CONFIG.dexNumberWidth).toBeGreaterThan(FORMAT_CONFIG.idWidth);
    expect(FORMAT_CONFIG.percentMax).toBe(100);
    expect(FORMAT_CONFIG.fallbackDash).not.toBe("");
    expect(FORMAT_CONFIG.fallbackUnknown).not.toBe("");
  });

  it("keeps error handling constants coherent", () => {
    expect(ERROR_CONFIG.clientErrorMinStatus).toBeLessThan(
      ERROR_CONFIG.clientErrorMaxStatus,
    );
    expect(ERROR_CONFIG.cancellationNames).toContain("AbortError");
    for (const message of Object.values(ERROR_CONFIG.messages)) {
      expect(message.startsWith(ERROR_CONFIG.invalidDataPrefix)).toBe(true);
    }
  });

  it("keeps icon metrics and semantic sizes explicit", () => {
    expect(ICON_CONFIG.defaultSize).toBeGreaterThan(0);
    expect(ICON_CONFIG.defaultStrokeWidth).toBeGreaterThan(0);
    expect(ICON_CONFIG.viewBoxSize).toBeGreaterThan(0);
    for (const size of Object.values(ICON_CONFIG.sizes)) {
      expect(size).toBeGreaterThan(0);
    }
  });

  it("keeps skeleton counts and keyboard keys explicit", () => {
    for (const count of Object.values(SKELETON_CONFIG)) {
      expect(count).toBeGreaterThan(0);
    }
    expect(KEYBOARD_CONFIG.escapeKey).toBe("Escape");
    expect(POKEMON_CONFIG.cardVisibleTypes).toBeGreaterThan(0);
  });

  it("keeps shared UI copy non-empty", () => {
    for (const value of Object.values(UI_COPY.shared)) {
      expect(value).not.toBe("");
    }
    for (const value of Object.values(UI_COPY.loading)) {
      expect(value).not.toBe("");
    }
    for (const value of Object.values(UI_COPY.navigation)) {
      if (typeof value === "string") {
        expect(value).not.toBe("");
      }
    }
  });

  it("resolves the live species count with the baseline as fallback", () => {
    expect(resolveTotalSpecies(1411)).toBe(1411);
    expect(resolveTotalSpecies(0)).toBe(POKEMON_CONFIG.totalSpecies);
    expect(resolveTotalSpecies(undefined)).toBe(POKEMON_CONFIG.totalSpecies);
    expect(resolveTotalSpecies(null)).toBe(POKEMON_CONFIG.totalSpecies);
  });

  it("defines the supported API endpoints", () => {
    expect(API_CONFIG.pokeApiBaseUrl).toBe("https://pokeapi.co/api/v2");
    expect(API_CONFIG.pokeApiOrigin).toBe("https://pokeapi.co");
    expect(API_CONFIG.spriteBaseUrl).toContain("raw.githubusercontent.com/PokeAPI/sprites");
  });

  it("keeps query and responsive policies explicit", () => {
    expect(QUERY_CONFIG.maxRetries).toBe(2);
    expect(QUERY_CONFIG.retryDelayMaxMs).toBeGreaterThan(QUERY_CONFIG.retryDelayBaseMs);
    expect(RESPONSIVE_CONFIG.mobileBreakpointPx).toBeGreaterThan(0);
  });

  it("keeps route patterns and link builders coherent", () => {
    expect(ROUTES.pokedexDetail).toBe(`${ROUTES.pokedex}/:id`);
    expect(ROUTES.pokemonDetail(25)).toBe(`${ROUTES.pokedex}/25`);
  });

  it("derives every navigation item from ROUTES", () => {
    const targets = NAV_ITEMS.map((item) => item.to);
    expect(targets).toContain(ROUTES.home);
    expect(targets).toContain(ROUTES.pokedex);
    expect(targets).toContain(ROUTES.favorites);
  });

  it("keeps the inline boot script in sync with the theme storage key", () => {
    // index.html kan geen TS importeren; deze check houdt de inline boot-script key in sync.
    // process.cwd() wordt gebruikt omdat import.meta.url onder jsdom geen file:-scheme heeft.
    const indexHtml = readFileSync(resolve(process.cwd(), "index.html"), "utf8");
    expect(indexHtml).toContain(`getItem("${STORAGE_KEYS.theme}")`);
  });

  it("keeps the inline boot script colors in sync with the theme tokens", () => {
    const indexHtml = readFileSync(resolve(process.cwd(), "index.html"), "utf8");
    const tokensCss = readFileSync(
      resolve(process.cwd(), "src/styles/tokens.css"),
      "utf8",
    );

    const themeLight = tokensCss.match(
      /--color-theme-light:\s*(#[0-9a-fA-F]+)/,
    )?.[1];
    const themeDark = tokensCss.match(
      /--color-theme-dark:\s*(#[0-9a-fA-F]+)/,
    )?.[1];

    expect(themeLight).toBeDefined();
    expect(themeDark).toBeDefined();
    expect(indexHtml).toContain(themeLight as string);
    expect(indexHtml).toContain(themeDark as string);
  });

  it("keeps the theme color variable names in sync with tokens.css", () => {
    const tokensCss = readFileSync(
      resolve(process.cwd(), "src/styles/tokens.css"),
      "utf8",
    );

    for (const variable of Object.values(THEME_COLOR_VARIABLES)) {
      expect(tokensCss).toContain(variable);
    }
  });

  it("keeps the CSS tablet breakpoint in sync with the responsive config", () => {
    const tokensCss = readFileSync(
      resolve(process.cwd(), "src/styles/tokens.css"),
      "utf8",
    );
    const match = tokensCss.match(
      /@custom-media --mq-tablet\s*\(max-width:\s*(\d+)px\)/,
    );

    expect(match?.[1]).toBe(String(RESPONSIVE_CONFIG.mobileBreakpointPx));
  });

  it("keeps the type family count in sync with the type tokens", () => {
    const tokensCss = readFileSync(
      resolve(process.cwd(), "src/styles/tokens.css"),
      "utf8",
    );
    // Alleen de enkelwoordige --color-type-* tokens (default, fire, ... fairy).
    const typeTokens = tokensCss.match(/--color-type-[a-z]+:/g) || [];

    expect(typeTokens).toHaveLength(POKEMON_CONFIG.typeCount);
  });

  it("keeps legacy redirect patterns coherent", () => {
    expect(LEGACY_ROUTES.pokedexDetail).toBe(`${LEGACY_ROUTES.pokedex}/:id`);
  });
});
