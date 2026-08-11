import type { QueryObserverResult, UseQueryResult } from "@tanstack/react-query";
import { getErrorMessage } from "@/utils";

export interface QueryState<TData, TError = Error> {
  data: TData | undefined;
  loading: boolean;
  fetching: boolean;
  placeholder: boolean;
  error: string;
  retry: () => Promise<QueryObserverResult<TData, TError>>;
}

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
