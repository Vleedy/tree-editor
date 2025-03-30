import { useState, useEffect, useCallback } from 'react';
import { AxiosError, AxiosResponse } from 'axios';

interface IUseQueryState<T> {
  data: T | null;
  isLoading: boolean;
  isFetching: boolean;
  error: AxiosError | null;
  refetch: () => Promise<void>;
}

function useQuery<T = unknown>(queryFn: () => Promise<AxiosResponse<T>>): IUseQueryState<T> {
  const [state, setState] = useState<Omit<IUseQueryState<T>, 'refetch'>>({
    data: null,
    isLoading: true,
    isFetching: false,
    error: null,
  });

  const fetchData = useCallback(
    async (isRefetch: boolean) => {
      try {
        setState((prev) => {
          if (isRefetch) {
            return { ...prev, isFetching: true, error: null };
          } else {
            return { ...prev, isLoading: true, error: null };
          }
        });
        const result = await queryFn();
        setState((prev) => ({ ...prev, data: result.data }));
      } catch (error) {
        setState((prev) => ({ ...prev, error: error as AxiosError }));
      } finally {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          isFetching: false,
        }));
      }
    },
    [queryFn]
  );

  useEffect(() => {
    fetchData(false);
  }, [fetchData]);

  const refetch = useCallback(() => fetchData(true), [fetchData]);

  return { ...state, refetch };
}

export default useQuery;
