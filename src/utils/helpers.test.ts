import { describe, expect, it } from "vitest";
import {
  formatDexNumber,
  formatPokemonId,
  getPokemonTypeClass,
  humanizeSlug,
} from "./helpers";

describe("Pokémon presentation helpers", () => {
  it("formats National Dex numbers consistently", () => {
    expect(formatPokemonId(1)).toBe("001");
    expect(formatDexNumber(25)).toBe("#0025");
  });

  it("creates type classes with a safe default", () => {
    expect(getPokemonTypeClass("Fire")).toBe("type-pill type-fire");
    expect(getPokemonTypeClass()).toBe("type-pill type-default");
  });

  it("humanizes API slugs with configurable fallbacks", () => {
    expect(humanizeSlug("very-fast")).toBe("very fast");
    expect(humanizeSlug(undefined)).toBe("—");
    expect(humanizeSlug(undefined, "Unknown")).toBe("Unknown");
  });
});
