import { describe, expect, it, vi } from "vitest";
import { createAppQueryClient, queryDefaults } from "./queryClient";

describe("app query client", () => {
  it("reuses cached data for a fresh query", async () => {
    const client = createAppQueryClient();
    const queryFn = vi.fn().mockResolvedValue({ value: "cached" });

    const first = await client.fetchQuery({ queryKey: ["cache-test"], queryFn });
    const second = await client.fetchQuery({ queryKey: ["cache-test"], queryFn });

    expect(first).toEqual(second);
    expect(queryFn).toHaveBeenCalledOnce();
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
    expect(queryFn).toHaveBeenCalledTimes(queryDefaults.retry + 1);
    expect(queryDefaults.retry).toBe(2);
  });
});
