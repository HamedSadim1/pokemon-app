import React, { useEffect } from "react";
import { ThemeContext } from "./ThemeContextDefinition";
import { usePersistentState } from "../hooks/usePersistentState";
import {
  applyTheme,
  getInitialTheme,
  isAppTheme,
  type AppTheme,
  type StorageAdapter,
} from "../utils";
import { STORAGE_KEYS } from "../config";

export type { AppTheme as Theme };

interface ThemeProviderProps {
  children: React.ReactNode;
  storage?: StorageAdapter;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  storage,
}) => {
  const [theme, setTheme] = usePersistentState<AppTheme>(
    STORAGE_KEYS.theme,
    "light",
    isAppTheme,
    storage,
    (rawValue) => getInitialTheme(rawValue),
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
