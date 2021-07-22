import { RequestOptions, RequestMethods } from './types';

export class Request {
  private readonly options: RequestOptions;

  constructor(options: RequestOptions) {
    this.options = options;
  }

  send(): Promise<XMLHttpRequest> {
    return new Promise((resolve, reject) => {
      const {
        url,
        data,
        headers,
        method = RequestMethods.GET,
        timeout = Infinity,
        withCredentials = false,
      } = this.options;
      const xhr = new XMLHttpRequest();
      xhr.timeout = timeout;
      xhr.withCredentials = withCredentials;
      xhr.open(method, url);
      if (headers) {
        for (const name in headers) {
          xhr.setRequestHeader(name, headers[name]);
        }
      }
      xhr.onload = () => {
        const { status } = xhr;
        if (status >= 200 && status < 300) {
          resolve(xhr);
        }
        reject(xhr);
      };
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      if (method === RequestMethods.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}
