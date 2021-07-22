import './styles';
import template from './template';
import { FormFieldProps, FormFieldState } from './types';

import { Component } from '~modules/Component';

export class FormField extends Component<FormFieldProps, FormFieldState> {
  input: HTMLInputElement;

  value: string;

  constructor(props: FormFieldProps) {
    super({
      template,
      props,
    });
  }

  get valid() {
    return !this.state.errors;
  }

  validate() {
    const { input } = this.refs;
    const errors = this.props.validate ? this.props.validate.call(this, input.value) : null;
    this.setState({ errors, value: input.value });
  }

  created() {
    const { input } = this.refs;
    if (this.state.readonly || this.state.disabled) {
      return false;
    }
    input.addEventListener('focus', () => {
      this.el.classList.add('is-focus');
    });
    input.addEventListener('blur', () => {
      this.el.classList.remove('is-focus');
    });
    input.addEventListener('change', () => this.validate());
  }
}
