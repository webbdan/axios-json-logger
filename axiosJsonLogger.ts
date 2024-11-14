import { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig, AxiosResponseHeaders, RawAxiosResponseHeaders, isAxiosError } from 'axios';
import { safeStringify } from './safeStringify'
import {Trace, TraceReport} from './trace'

/**
 * Adds pretty JSON logging to an Axios instance.
 * @param axiosInstance - The Axios instance to wrap.
 * @returns The same Axios instance with logging interceptors.
 */
export function addAxiosJsonLogger(axiosInstance: AxiosInstance, config = { logOnlyOnError: false, expectError: false })
{
    const yellow = '\x1b[93m'
    const red = '\x1b[31m'
    const reset = '\x1b[0m';
    
    axiosInstance.interceptors.request.use((request) => {
        request.headers['X-Request-Tracking-ID'] = Date.now().toString();
        return request;
    });
      
    axiosInstance.interceptors.response.use(
        (response) => {
            
            const requestHeadersStr = getHeadersString(response.request?.headers)
            const requestBodyStr = response.request?.requestBody !== undefined ? safeStringify(response.request?.requestBody) : ''
            
            let responseHeadersStr = ''
            let responseBodyStr = ''
            if (response) {
                responseHeadersStr = getHeadersString(response.headers)
                responseBodyStr = safeStringify(response.data)
            }
          
            const responseStatus = response?.status

            const url = response.config.url ?? ''
          
            const traceReport = new TraceReport(
                response.request.method,
                url,
                requestHeadersStr,
                requestBodyStr,
                responseStatus,
                responseHeadersStr,
                responseBodyStr,
            )
          
            const trace = new Trace()
            trace.name = `${traceReport.method.toUpperCase()}: ${traceReport.url}`
            trace.report = traceReport

            if (!config.logOnlyOnError || (config.expectError && (response.status >= 200 && response.status < 400))) {
              trace.report?.log();
            }

            return response;
          },
          (error) => {
            // If the error doesn't have a response (network error, timeout, etc.), log the request and error message
            if (!error.response) {
              console.error(`===== ${yellow}${error.config.method.toUpperCase()} ${red}${error.config.url}${reset} =====\n`,{
                request: {
                  method: error.config.method,
                  url: error.config.url,
                  headers: error.config.headers,
                  data: error.config.data || null,
                },
                error: {
                  message: error.message,
                  code: error.code,
                  request: error.request,
                },
              });
            } else {
              // If the error has a response (status code >= 400), log the error
              console.log(`===== ${yellow}${error.config.method.toUpperCase()} ${red}${error.config.url}${reset} =====\n`,{
                request: {
                  method: error.config.method,
                  url: error.config.url,
                  headers: error.config.headers,
                  data: error.config.data || null,
                },
                response: {
                  status: error.response.status,
                  statusText: error.response.statusText,
                  data: error.response.data,
                  headers: error.response.headers,
                },
              });
            }
            return Promise.reject(error);
          }
        );
}

function getHeadersString(headers: Partial<AxiosResponseHeaders & RawAxiosResponseHeaders>): string {
    let headersString = ''
  
    for (const key in headers) {
      if (Object.hasOwnProperty.call(headers, key)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const value = headers[key]
  
        // Ensure value is defined and convert to string
        if (value !== undefined) {
          headersString += `${key}: ${String(value)}\n`
        }
      }
    }
  
    return headersString.trim() // Remove trailing newline
  }

