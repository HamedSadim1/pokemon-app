import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ERROR_CONFIG, QUERY_CONFIG } from "@/config";
import { isRequestCancellation } from "@/utils";

export const isNonRetryableQueryError = (error: unknown): boolean => {
  if (isRequestCancellation(error)) return true;
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    return (
      status !== undefined &&
      status >= ERROR_CONFIG.clientErrorMinStatus &&
      status < ERROR_CONFIG.clientErrorMaxStatus
    );
  }

  if (error instanceof Error) {
    return error.message.startsWith(ERROR_CONFIG.invalidDataPrefix);
  }

  return false;
};

export const shouldRetryQuery = (failureCount: number, error: unknown) =>
  !isNonRetryableQueryError(error) && failureCount < QUERY_CONFIG.maxRetries;

export const queryRetryDelay = (attemptIndex: number) =>
  Math.min(
    QUERY_CONFIG.retryDelayBaseMs * 2 ** attemptIndex,
    QUERY_CONFIG.retryDelayMaxMs,
  );

export const queryDefaults = {
  staleTime: QUERY_CONFIG.defaultStaleTimeMs,
  gcTime: QUERY_CONFIG.defaultGcTimeMs,
  retry: shouldRetryQuery,
  retryDelay: queryRetryDelay,
  refetchOnWindowFocus: false,
} as const;

export const queryPolicies = {
  catalogSearch: {
    staleTime: QUERY_CONFIG.catalogStaleTimeMs,
    gcTime: QUERY_CONFIG.catalogGcTimeMs,
  },
  pokemonDetail: {
    staleTime: QUERY_CONFIG.detailStaleTimeMs,
    gcTime: QUERY_CONFIG.detailGcTimeMs,
  },
} as const;

export const createAppQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: queryDefaults,
    },
  });
