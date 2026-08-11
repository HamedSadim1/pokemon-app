import type { QueryObserverResult, UseQueryResult } from "@tanstack/react-query";

export interface QueryState<TData, TError = Error> {
  data: TData | undefined;
  loading: boolean;
  fetching: boolean;
  error: string;
  retry: () => Promise<QueryObserverResult<TData, TError>>;
}

const getErrorMessage = (error: unknown): string => {
  if (!error) return "";
  if (error instanceof Error) return error.message;
  if (typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string") return message;
  }
  return String(error);
};

export const useQueryState = <TData, TError = Error>(
  query: UseQueryResult<TData, TError>,
): QueryState<TData, TError> => ({
  data: query.data,
  loading: query.isLoading,
  fetching: query.isFetching,
  error: getErrorMessage(query.error),
  retry: query.refetch,
});
