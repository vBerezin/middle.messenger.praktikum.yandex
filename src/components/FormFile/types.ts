import { ButtonProps } from '~components/Button/types';

export type FormFileProps = {
  action?: string,
  input: {
    name: string,
    accept?: string[],
  },
  button: ButtonProps,
  submit: Function,
};

export type FormFileState = {
  value?: null | {
    file: File,
    name: string
  },
};
