import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createMemoryStorage } from "../utils/storage";
import { usePersistentState } from "./usePersistentState";

const isCounter = (value: unknown): value is number => typeof value === "number";

describe("usePersistentState", () => {
  it("hydrates and persists functional updates", () => {
    const storage = createMemoryStorage({ count: JSON.stringify(2) });
    const { result } = renderHook(() =>
      usePersistentState("count", 0, isCounter, storage),
    );

    expect(result.current[0]).toBe(2);

    act(() => {
      result.current[1]((previous) => previous + 1);
    });

    expect(result.current[0]).toBe(3);
    expect(storage.values.get("count")).toBe(JSON.stringify(3));
  });
});
