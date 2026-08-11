import { act, renderHook } from "@testing-library/react";
import { StrictMode } from "react";
import { describe, expect, it } from "vitest";
import { ThemeProvider } from "./ThemeContext";
import { useTheme } from "../hooks";
import { createMemoryStorage } from "../utils";

describe("ThemeProvider", () => {
  it("reads the stored theme once during initialization", () => {
    let reads = 0;
    const storage = {
      getItem: () => {
        reads += 1;
        return "dark";
      },
      setItem: () => undefined,
    };

    const { result, rerender } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => <ThemeProvider storage={storage}>{children}</ThemeProvider>,
    });

    expect(result.current.theme).toBe("dark");
    expect(reads).toBe(1);

    rerender();
    expect(reads).toBe(1);

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe("light");
  });

  it("does not duplicate the storage read under StrictMode", () => {
    let reads = 0;
    const storage = {
      getItem: () => {
        reads += 1;
        return "dark";
      },
      setItem: () => undefined,
    };

    renderHook(() => useTheme(), {
      wrapper: ({ children }) => (
        <StrictMode>
          <ThemeProvider storage={storage}>{children}</ThemeProvider>
        </StrictMode>
      ),
    });

    expect(reads).toBe(1);
  });

  it("supports JSON-encoded themes through the provider", () => {
    const storage = createMemoryStorage({ theme: JSON.stringify("dark") });
    const { result } = renderHook(() => useTheme(), {
      wrapper: ({ children }) => <ThemeProvider storage={storage}>{children}</ThemeProvider>,
    });

    expect(result.current.theme).toBe("dark");
  });
});
