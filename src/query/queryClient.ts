import { QueryClient } from "@tanstack/react-query";

export const queryDefaults = {
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 10,
  retry: 2,
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
