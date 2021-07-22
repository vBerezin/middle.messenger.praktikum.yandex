import { ButtonProps } from '~components/Button/types';

export type PageErrorProps = {
  title?: string,
  text?: string,
  button?: ButtonProps,
};

export type PageErrorState = {
  text?: string
};
