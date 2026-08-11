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

  it("passes the raw value to a fallback after one storage read", () => {
    let reads = 0;
    const storage = {
      getItem: (key: string) => {
        reads += 1;
        return key === "theme" ? "dark" : null;
      },
      setItem: () => undefined,
    };

    expect(readStorage("theme", "light", isString, storage, (raw) => raw === "dark" ? "legacy-dark" : "light")).toBe("legacy-dark");
    expect(reads).toBe(1);
  });

  it("does not cache a failed storage read", () => {
    let shouldFail = true;
    let reads = 0;
    const storage = {
      getItem: () => {
        reads += 1;
        if (shouldFail) throw new Error("temporary failure");
        return "dark";
      },
      setItem: () => undefined,
    };

    const fromRaw = (raw: string | null) => raw === "dark" ? "legacy-dark" : "light";
    expect(readStorage("theme", "light", isString, storage, fromRaw)).toBe("light");
    shouldFail = false;
    expect(readStorage("theme", "light", isString, storage, fromRaw)).toBe("legacy-dark");
    expect(reads).toBe(2);
  });

  it("invalidates a cached raw fallback after a write", () => {
    let value = "dark";
    let reads = 0;
    const storage = {
      getItem: () => {
        reads += 1;
        return value;
      },
      setItem: (_key: string, nextValue: string) => {
        value = JSON.parse(nextValue);
      },
    };

    const fromRaw = (raw: string | null) => raw === "dark" ? "legacy-dark" : "light";
    expect(readStorage("theme", "light", isString, storage, fromRaw)).toBe("legacy-dark");
    expect(writeStorage("theme", "light", storage)).toBe(true);
    expect(readStorage("theme", "light", isString, storage, fromRaw)).toBe("light");
    expect(reads).toBe(2);
  });
});
