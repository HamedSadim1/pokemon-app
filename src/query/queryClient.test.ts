import { describe, expect, it, vi } from "vitest";
import { QUERY_CONFIG } from "../config";
import {
  createAppQueryClient,
  isNonRetryableQueryError,
  queryDefaults,
  queryRetryDelay,
  shouldRetryQuery,
} from "./queryClient";

describe("app query client", () => {
  it("reuses cached data for a fresh query", async () => {
    const client = createAppQueryClient();
    const queryFn = vi.fn().mockResolvedValue({ value: "cached" });

    const first = await client.fetchQuery({ queryKey: ["cache-test"], queryFn });
    const second = await client.fetchQuery({ queryKey: ["cache-test"], queryFn });

    expect(first).toEqual(second);
    expect(queryFn).toHaveBeenCalledOnce();
  });

  it("uses bounded exponential retry behavior", () => {
    expect(queryRetryDelay(0)).toBe(QUERY_CONFIG.retryDelayBaseMs);
    expect(queryRetryDelay(1)).toBe(QUERY_CONFIG.retryDelayBaseMs * 2);
    expect(queryRetryDelay(10)).toBe(QUERY_CONFIG.retryDelayMaxMs);
    expect(shouldRetryQuery(0, new Error("temporary failure"))).toBe(true);
    expect(shouldRetryQuery(2, new Error("temporary failure"))).toBe(false);
    expect(isNonRetryableQueryError(new Error("Invalid Pokémon list response"))).toBe(true);
    expect(isNonRetryableQueryError(new DOMException("aborted", "AbortError"))).toBe(true);
    expect(isNonRetryableQueryError({ name: "CanceledError" })).toBe(true);
  });

  it("retries failed queries according to the shared policy", async () => {
    const client = createAppQueryClient();
    client.setDefaultOptions({
      queries: { ...queryDefaults, retryDelay: 0 },
    });
    const queryFn = vi.fn().mockRejectedValue(new Error("temporary failure"));

    await expect(
      client.fetchQuery({ queryKey: ["retry-test"], queryFn }),
    ).rejects.toThrow("temporary failure");
    expect(queryFn).toHaveBeenCalledTimes(3);
    expect(typeof queryDefaults.retry).toBe("function");
  });
});
