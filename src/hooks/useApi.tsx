import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
  type QueryKey,
  type DefaultError,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

type ApiError = AxiosError<unknown, any> | DefaultError;

export const useApiQuery = <
  TQueryFnData,
  TError = ApiError,
  TData = TQueryFnData,
>(

  queryKey: string,
  queryFn: () => Promise<TQueryFnData>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, QueryKey>,
    "queryKey" | "queryFn" 
  >,
): UseQueryResult<TData, TError> => {
  if (!queryKey || !queryFn) {
    console.error("useApiQuery requiere queryKey y queryFn.");
  }
  const keyArray = Array.isArray(queryKey) ? queryKey : [queryKey];

  return useQuery<TQueryFnData, TError, TData, QueryKey>({
    queryKey: keyArray,
    queryFn: queryFn,
    staleTime: 1000 * 60, 
    ...options,
  });
};