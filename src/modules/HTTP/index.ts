import { Request } from '~modules/Request';
import { RequestMethods } from '~modules/Request/types';
import { HTTPGetRequestProps, HTTPRequestProps } from './types';

export const HTTP = {
  get(url: string, options?: HTTPGetRequestProps) {
    let params = null;
    if (options?.data) {
      const { data } = options;
      params = Object.entries(data).map(([key, val]) => `${key}=${val}`).join('&');
    }
    const request = new Request({
      ...options,
      url: params ? `${url}?${params}` : url,
      method: RequestMethods.GET,
    });
    return request.send();
  },
  put(url: string, options?: HTTPRequestProps) {
    const request = new Request({
      ...options,
      url,
      method: RequestMethods.PUT,
    });
    return request.send();
  },
  delete(url: string, options?: HTTPRequestProps) {
    const request = new Request({
      ...options,
      url,
      method: RequestMethods.DELETE,
    });
    return request.send();
  },
  post(url: string, options?: HTTPRequestProps) {
    const request = new Request({
      ...options,
      url,
      method: RequestMethods.POST,
    });
    return request.send();
  },
};
