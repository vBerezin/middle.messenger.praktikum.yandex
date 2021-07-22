import { RequestOptions } from '~modules/Request/types';

export type HTTPRequestProps = Omit<RequestOptions, 'method' | 'url'>;
export type HTTPGetRequestProps = HTTPRequestProps & {
  data?: {
    [key: string]: string,
  }
};
