import { useState, useCallback } from 'react';

import { AxiosError, AxiosResponse } from 'axios';

import { ErrorResponseData } from '../../tree/api/types';

interface IUseMutationState<T, E = ErrorResponseData> {
  data: T | null;
  error: AxiosError<E> | null;
  isLoading: boolean;
}

export function useMutation<T, E = ErrorResponseData>(
  onSuccess?: () => void,
  onError?: (error: AxiosError<E>) => void
) {
  const [state, setState] = useState<IUseMutationState<T, E>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const execute = useCallback(
    async (queryFn: () => Promise<AxiosResponse<T>>) => {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));
        const response = await queryFn();
        setState({
          data: response.data,
          error: null,
          isLoading: false,
        });
        onSuccess?.();
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: error as AxiosError<E>,
        }));
        onError?.(error as AxiosError<E>);
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [onSuccess, onError]
  );

  return { ...state, execute };
}
