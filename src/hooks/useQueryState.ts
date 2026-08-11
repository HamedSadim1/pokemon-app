import type { QueryObserverResult, UseQueryResult } from "@tanstack/react-query";

export interface QueryState<TData, TError = Error> {
  data: TData | undefined;
  loading: boolean;
  fetching: boolean;
  placeholder: boolean;
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
  return "Request failed";
};

export const useQueryState = <TData, TError = Error>(
  query: UseQueryResult<TData, TError>,
): QueryState<TData, TError> => ({
  data: query.data,
  loading: query.isPending && query.isFetching,
  fetching: query.isFetching,
  placeholder: query.isPlaceholderData,
  error: getErrorMessage(query.error),
  retry: query.refetch,
});
