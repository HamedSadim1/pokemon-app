import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useQueryState } from "./useQueryState";

const createWrapper = (client: QueryClient) =>
  ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );

describe("useQueryState", () => {
  it("normalizes query state and retries the active query", async () => {
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const queryFn = vi.fn().mockRejectedValueOnce({ message: "offline" }).mockResolvedValue("ok");
    const { result } = renderHook(
      () => useQueryState(useQuery({ queryKey: ["hook-state"], queryFn })),
      { wrapper: createWrapper(client) },
    );

    await waitFor(() => expect(result.current.error).toBe("offline"));
    expect(result.current.loading).toBe(false);

    await act(async () => {
      await result.current.retry();
    });

    await waitFor(() => expect(result.current.data).toBe("ok"));
    expect(queryFn).toHaveBeenCalledTimes(2);
  });

  it("does not report a disabled query as actively loading", () => {
    const client = new QueryClient();
    const { result } = renderHook(
      () =>
        useQueryState(
          useQuery({
            queryKey: ["disabled-state"],
            queryFn: async () => "never",
            enabled: false,
          }),
        ),
      { wrapper: createWrapper(client) },
    );

    expect(result.current.loading).toBe(false);
    expect(result.current.fetching).toBe(false);
  });
});
