export type FormFieldProps = {
  name: string,
  label?: string,
  type?: string | 'text' | 'email' | 'number' | 'password' | 'tel',
  id?: string
  value?: string | number,
  readonly?: boolean,
  required?: boolean,
  disabled?: boolean,
  validate?: (value: string | number) => string | string[] | null,
  class?: string,
  mods: string | string[]
};

export type FormFieldState = Omit<FormFieldProps, 'name' | 'validate'> & {
  errors?: string | string[] | null,
};
