import { describe, expect, it } from "vitest";
import {
  createMemoryStorage,
  readRawStorage,
  readStorage,
  writeStorage,
} from "./storage";

describe("storage helpers", () => {
  const isString = (value: unknown): value is string => typeof value === "string";

  it("reads and writes validated JSON values", () => {
    const storage = createMemoryStorage();
    expect(writeStorage("theme", "dark", storage)).toBe(true);
    expect(readStorage("theme", "light", isString, storage)).toBe("dark");
  });

  it("falls back for missing or malformed values", () => {
    const missing = createMemoryStorage();
    expect(readStorage("theme", "light", isString, missing)).toBe("light");

    const malformed = createMemoryStorage({ theme: "{invalid" });
    expect(readStorage("theme", "light", isString, malformed)).toBe("light");

    const invalidShape = createMemoryStorage({ theme: JSON.stringify({ value: "dark" }) });
    expect(readStorage("theme", "light", isString, invalidShape)).toBe("light");
  });

  it("returns false when writing fails", () => {
    const storage = {
      getItem: () => null,
      setItem: () => {
        throw new Error("quota exceeded");
      },
    };

    expect(readStorage("theme", "light", isString, storage)).toBe("light");
    expect(writeStorage("theme", "dark", storage)).toBe(false);
  });

  it("reads raw values for legacy string storage", () => {
    const storage = createMemoryStorage({ theme: "dark" });
    expect(readRawStorage("theme", null, storage)).toBe("dark");
    expect(readRawStorage("missing", null, storage)).toBeNull();
  });
});
