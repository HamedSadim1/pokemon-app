import { beforeEach, describe, expect, it } from "vitest";
import {
  applyTheme,
  getInitialTheme,
  getSystemTheme,
  isAppTheme,
} from "./theme";

describe("theme initialization", () => {
  beforeEach(() => {
    document.documentElement.className = "";
    document.documentElement.style.colorScheme = "";
    document.head.innerHTML = '<meta name="theme-color" content="#f97316">';
  });

  it("accepts only supported theme values", () => {
    expect(isAppTheme("dark")).toBe(true);
    expect(isAppTheme("light")).toBe(true);
    expect(isAppTheme("system")).toBe(false);
  });

  it("prefers a valid stored theme over the system preference", () => {
    expect(getInitialTheme(JSON.stringify("dark"), false)).toBe("dark");
    expect(getInitialTheme(JSON.stringify("light"), true)).toBe("light");
    expect(getInitialTheme("dark", false)).toBe("dark");
  });

  it("falls back to the system preference when storage is missing or invalid", () => {
    expect(getInitialTheme(null, true)).toBe("dark");
    expect(getInitialTheme(JSON.stringify("invalid"), false)).toBe("light");
    expect(getInitialTheme("invalid", false)).toBe("light");
    expect(getSystemTheme(true)).toBe("dark");
  });

  it("applies the class and color scheme before rendering", () => {
    applyTheme("dark");
    expect(document.documentElement).toHaveClass("dark");
    expect(document.documentElement.style.colorScheme).toBe("dark");
    expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      "#0d1521",
    );

    applyTheme("light");
    expect(document.documentElement).not.toHaveClass("dark");
    expect(document.documentElement.style.colorScheme).toBe("light");
    expect(document.querySelector('meta[name="theme-color"]')).toHaveAttribute(
      "content",
      "#f97316",
    );
  });
});
