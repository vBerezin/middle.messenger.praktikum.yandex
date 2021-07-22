import './styles';
import template from './template';
import { FormAuthProps, FormAuthState } from './types';

import { Component } from '~modules/Component';

import { Button } from '~components/Button';
import { FormField } from '~components/FormField';

export class FormAuth extends Component<FormAuthProps, FormAuthState> {
  private readonly fields: FormField[];

  private readonly buttons: Button[];

  constructor(props: FormAuthProps) {
    super({ template, props });
    this.buttons = props.buttons.map((button) => new Button(button));
    this.fields = props.fields.map((field) => new FormField({
      ...field,
      class: 'form-auth__field',
    }));
  }

  onSubmit(event) {
    const fields = this.fields.filter((field) => {
      field.validate();
      return !field.valid && field.props.required;
    });
    if (fields.length) {
      event.preventDefault();
      return false;
    }
    return this.props.submit.call(this, event);
  }

  created() {
    this.el.addEventListener('submit', this.onSubmit.bind(this));
    this.el.addEventListener('change', () => {
      this.fields.forEach((field) => field.validate());
    });
  }

  mounted() {
    this.fields.forEach((field) => field.mount(this.refs.fieldset));
    this.buttons.forEach((button) => button.mount(this.refs.footer));
  }
}
