import type { AxiosInstance, AxiosRequestConfig, Method, AxiosResponse, AxiosHeaders } from 'axios';
import axios from 'axios';
import { HTTP_METHOD } from '@/consts/api';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://api.jscode.kr',
});

const handleResponse = <T>(response: AxiosResponse<T>) => {
  return response.data;
};

const handleInterceptor = (_axiosInstance: AxiosInstance) => {
  _axiosInstance.interceptors.request.use(function (interceptorConfig) {
    if (!interceptorConfig?.headers) {
      throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
    }
    (interceptorConfig.headers as AxiosHeaders).set(
      'Authorization',
      `Bearer ${typeof window !== 'undefined' && localStorage.getItem('accessToken')}`
    );
    return interceptorConfig;
  });
};

const createApiMethod =
  (_axiosInstance: AxiosInstance, method: Method) =>
  (url: AxiosRequestConfig['url'], config?: Omit<AxiosRequestConfig, 'url'>): Promise<any> => {
    handleInterceptor(_axiosInstance);
    return _axiosInstance({
      ...{ url, ...config },
      method,
    }).then((res) => handleResponse(res));
  };

export default {
  get: createApiMethod(axiosInstance, HTTP_METHOD.GET),
  post: createApiMethod(axiosInstance, HTTP_METHOD.POST),
  patch: createApiMethod(axiosInstance, HTTP_METHOD.PATCH),
  put: createApiMethod(axiosInstance, HTTP_METHOD.PUT),
  delete: createApiMethod(axiosInstance, HTTP_METHOD.DELETE),
};
