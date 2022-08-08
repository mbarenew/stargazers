import {AxiosError} from 'axios';

export const getResponseError = (
  error: unknown,
): {data: any; status: number} | null => {
  const axiosError = error as AxiosError;
  if (axiosError.response) {
    return {
      data: axiosError.response.data,
      status: axiosError.response.status,
    };
  }

  return null;
};
