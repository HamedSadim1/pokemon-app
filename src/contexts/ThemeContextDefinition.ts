import { createContext } from "react";
import type { AppTheme } from "@/utils";

export type Theme = AppTheme;

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
