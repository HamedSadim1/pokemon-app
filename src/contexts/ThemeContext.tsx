import React, { useEffect } from "react";
import { ThemeContext } from "./ThemeContextDefinition";
import { usePersistentState } from "../hooks/usePersistentState";
import { applyTheme, getInitialTheme, isAppTheme, type AppTheme } from "../utils/theme";

export type { AppTheme as Theme };

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = usePersistentState<AppTheme>(
    "theme",
    getInitialTheme(),
    isAppTheme,
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
