import { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

/**
 * Adds pretty JSON logging to an Axios instance.
 * @param axiosInstance - The Axios instance to wrap.
 * @returns The same Axios instance with logging interceptors.
 */
export function addAxiosJsonLogger(axiosInstance: AxiosInstance): AxiosInstance {
  // Intercept requests
  axiosInstance.interceptors.request.use(
    (request: InternalAxiosRequestConfig) => {
      console.log('Request:', JSON.stringify({
        url: request.url,
        method: request.method,
        headers: request.headers,
        data: request.data,
        params: request.params,
      }, null, 2));
      return request;
    },
    (error: AxiosError) => {
      console.error('Request Error:', JSON.stringify({
        message: error.message,
        config: error.config,
      }, null, 2));
      return Promise.reject(error);
    }
  );

  // Intercept responses
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse<any>) => {
      console.log('Response:', JSON.stringify({
        url: response.config.url,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        data: response.data,
      }, null, 2));
      return response;
    },
    (error: AxiosError) => {
      console.error('Response Error:', JSON.stringify({
        message: error.message,
        response: error.response ? {
          url: error.response.config.url,
          status: error.response.status,
          statusText: error.response.statusText,
          headers: error.response.headers,
          data: error.response.data,
        } : null,
      }, null, 2));
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}