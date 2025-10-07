/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface ApiRequestOptions extends AxiosRequestConfig {
  onSuccess?: (response: AxiosResponse) => void;
  onError?: (error: any) => void;
}

export const makeApiRequest = (
  endpoint: string,
  method: 'get' | 'post' | 'put' | 'delete',
  data?: any,
  options?: ApiRequestOptions
): Promise<AxiosResponse<any>> => {
  const { onSuccess, onError, ...axiosOptions } = options || {};

  return axios({
    url: `/api${endpoint}`,
    method,
    data,
    ...axiosOptions,
  })
    .then((response) => {
      if (onSuccess) {
        onSuccess(response);
      }
      // Log response only in development
      if (process.env.NODE_ENV === 'development') {
        console.log(response);
      }
      return response;
    })
    .catch((error: any) => {
      if (onError) {
        onError(error);
      }
      // Log error only in development
      if (process.env.NODE_ENV === 'development') {
        console.log(error);
      }
      throw error;
    });
};
