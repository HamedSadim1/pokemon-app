import { describe, expect, it } from "vitest";
import {
  createMemoryStorage,
  readStorage,
  writeStorage,
} from "./storage";

const isString = (value: unknown): value is string => typeof value === "string";

 describe("persistent storage", () => {
  it("reads and writes validated values", () => {
    const storage = createMemoryStorage();

    expect(writeStorage("theme", "dark", storage)).toBe(true);
    expect(readStorage("theme", "light", isString, storage)).toBe("dark");
  });

  it("returns the fallback for malformed JSON", () => {
    const storage = createMemoryStorage({ theme: "{broken" });

    expect(readStorage("theme", "light", isString, storage)).toBe("light");
  });

  it("returns the fallback for valid JSON with the wrong shape", () => {
    const storage = createMemoryStorage({ theme: JSON.stringify({ value: "dark" }) });

    expect(readStorage("theme", "light", isString, storage)).toBe("light");
  });

  it("does not throw when storage is unavailable", () => {
    const storage = {
      getItem: () => {
        throw new Error("blocked");
      },
      setItem: () => {
        throw new Error("blocked");
      },
    };

    expect(readStorage("theme", "light", isString, storage)).toBe("light");
    expect(writeStorage("theme", "dark", storage)).toBe(false);
  });
});
