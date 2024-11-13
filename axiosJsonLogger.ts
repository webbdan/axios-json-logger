import { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

/**
 * Adds pretty JSON logging to an Axios instance.
 * @param axiosInstance - The Axios instance to wrap.
 * @returns The same Axios instance with logging interceptors.
 */
export function addAxiosJsonLogger(axiosInstance: AxiosInstance): void {
    axiosInstance.interceptors.request.use((request: InternalAxiosRequestConfig) => {
      request.headers['X-Request-ID'] = Date.now();  
      return request;
    });
  
    axiosInstance.interceptors.response.use((response: AxiosResponse) => {
      logRequestResponse(response.config, response);
      return response;
    }, (error) => {
      if (error.response) {
        logRequestResponse(error.response.config, error.response);
      } else {
        console.error(`Error: ${error.message}`);
      }
      return Promise.reject(error);
    });
  }
  
  function logRequestResponse(requestConfig: InternalAxiosRequestConfig, responseData: any) {
    console.log(`\n===== ${requestConfig.method?.toUpperCase()} ${requestConfig.url} =====`);
    console.log(JSON.stringify({
      request: {
        method: requestConfig.method,
        url: requestConfig.url,
        headers: requestConfig.headers,
        data: requestConfig.data
      },
      response: {
        status: responseData.status,
        statusText: responseData.statusText,
        data: responseData.data,
        headers: responseData.headers
      }
    }, null, 2));
    console.log('\n============================================================\n');
  }