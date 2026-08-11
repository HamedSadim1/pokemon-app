import React, { useEffect } from "react";
import { ThemeContext, type Theme } from "./ThemeContextDefinition";
import { usePersistentState } from "../hooks/usePersistentState";

const isTheme = (value: unknown): value is Theme =>
  value === "light" || value === "dark";

const getSystemTheme = (): Theme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = usePersistentState(
    "theme",
    getSystemTheme(),
    isTheme,
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
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
