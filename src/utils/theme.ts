import { readRawStorage, type StorageAdapter } from "./storage";
import { STORAGE_KEYS } from "@/config";

export type AppTheme = "light" | "dark";

export const isAppTheme = (value: unknown): value is AppTheme =>
  value === "light" || value === "dark";

const getStoredTheme = (storedValue: string | null): AppTheme | null => {
  if (!storedValue) return null;

  try {
    const parsed: unknown = JSON.parse(storedValue);
    return isAppTheme(parsed) ? parsed : null;
  } catch {
    return isAppTheme(storedValue) ? storedValue : null;
  }
};

export const getSystemTheme = (prefersDark?: boolean): AppTheme => {
  const systemPrefersDark =
    prefersDark ??
    (typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  return systemPrefersDark ? "dark" : "light";
};

export const getInitialTheme = (
  storedValue?: string | null,
  prefersDark?: boolean,
  adapter?: StorageAdapter,
): AppTheme => {
  const persistedValue =
    storedValue === undefined
      ? readRawStorage(STORAGE_KEYS.theme, null, adapter)
      : storedValue;

  return getStoredTheme(persistedValue ?? null) || getSystemTheme(prefersDark);
};

export const THEME_COLOR_VARIABLES: Record<AppTheme, string> = {
  light: "--color-theme-light",
  dark: "--color-theme-dark",
} as const;

export const applyTheme = (theme: AppTheme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;

  const themeColor = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]',
  );
  if (themeColor) {
    // Single source of truth: tokens.css definieert de browser chrome kleuren.
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue(THEME_COLOR_VARIABLES[theme])
      .trim();
    // Alleen bijwerken als de token beschikbaar is; anders blijft de huidige waarde behouden.
    if (color) {
      themeColor.content = color;
    }
  }
};
