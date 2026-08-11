import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

const MAX_QUERY_RETRIES = 2;

export const isNonRetryableQueryError = (error: unknown): boolean => {
  if (axios.isCancel(error)) return true;
  if (error instanceof Error && error.name === "AbortError") return true;
  if (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    ["AbortError", "CanceledError"].includes(
      (error as { name?: unknown }).name as string,
    )
  ) {
    return true;
  }
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    return status !== undefined && status >= 400 && status < 500;
  }

  if (error instanceof Error) {
    return error.message.startsWith("Invalid ");
  }

  return false;
};

export const shouldRetryQuery = (failureCount: number, error: unknown) =>
  !isNonRetryableQueryError(error) && failureCount < MAX_QUERY_RETRIES;

export const queryRetryDelay = (attemptIndex: number) =>
  Math.min(1000 * 2 ** attemptIndex, 30_000);

export const queryDefaults = {
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 10,
  retry: shouldRetryQuery,
  retryDelay: queryRetryDelay,
  refetchOnWindowFocus: false,
} as const;

export const queryPolicies = {
  catalogSearch: {
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  },
  pokemonDetail: {
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  },
} as const;

export const createAppQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: queryDefaults,
    },
  });
