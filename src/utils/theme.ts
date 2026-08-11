import { readRawStorage, type StorageAdapter } from "./storage";

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
    storedValue === undefined ? readRawStorage("theme", null, adapter) : storedValue;

  return getStoredTheme(persistedValue ?? null) || getSystemTheme(prefersDark);
};

export const applyTheme = (theme: AppTheme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;

  const themeColor = document.querySelector<HTMLMetaElement>(
    'meta[name="theme-color"]',
  );
  if (themeColor) {
    themeColor.content = theme === "dark" ? "#0d1521" : "#f97316";
  }
};
