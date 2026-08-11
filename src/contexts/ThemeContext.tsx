import React, { useEffect, useState } from "react";
import { ThemeContext, type Theme } from "./ThemeContextDefinition";
import { readStorage, writeStorage } from "../utils/storage";

const isTheme = (value: unknown): value is Theme =>
  value === "light" || value === "dark";

const getSystemTheme = (): Theme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(() =>
    readStorage("theme", getSystemTheme(), isTheme),
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    writeStorage("theme", theme);
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
