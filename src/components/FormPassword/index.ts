import './styles';
import template from './template';
import { FormPasswordState } from './types';

import { Component } from '~modules/Component';

import { FormField } from '~components/FormField';
import { Button } from '~components/Button';
import { Validate } from '~modules/Validate';
import { Users } from '~entities/Users';
import { FormFieldProps } from '~components/FormField/types';
import { Router } from '~modules/Router';
import { ROUTES } from '~common/scripts/routes';

export class FormPassword extends Component<null, FormPasswordState> {
  #fieldSet;
  #footer;
  private readonly button: Button;
  private fields: FormField[];
  private keys: FormFieldProps[];

  constructor() {
    super({template});
    this.button = new Button({
      class: 'form-password__submit',
      mods: ['blue', 'block'],
      text: 'Изменить пароль',
      attributes: {
        type: 'submit'
      }
    });
    this.keys = [
      {
        label: 'Старый пароль',
        name: 'oldPassword',
        id: 'formUser[oldPassword]',
        type: 'password',
        required: true,
      },
      {
        label: 'Новый пароль',
        name: 'newPassword',
        id: 'formUser[newPassword]',
        type: 'password',
        required: true,
        validate: Validate.field.password,
      },
      {
        label: 'Повторите новый пароль',
        name: 'newPasswordConfirm',
        id: 'formUser[newPasswordConfirm]',
        type: 'password',
        required: true,
        validate: (value) => {
          const password = this.el.newPassword.value;
          return value === password ? null : 'Пароли не совпадают';
        }
      },
    ];
    this.fields = this.keys.map((key) => {
      return new FormField({
        ...key,
        class: 'form-password__field',
      });
    })
  }

  validate() {
    const fields = this.fields.filter((field) => {
      field.validate();
      return !field.valid && field.props.required;
    });
    return !fields.length;

  }

  onSubmit(event) {
    event.preventDefault();
    if (!this.validate()) {
      return false;
    }
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    Users
      .passwordChange(JSON.stringify(data))
      .then(() => {
        Router.go(ROUTES.user.profile);
      })
      .catch((xhr) => {
        const response = JSON.parse(xhr.response);
        const oldPassword = this.fields.find(field => field.props.name === 'oldPassword');
        oldPassword.setState({
          errors: response.reason
        })
      });
  }

  created() {
    this.#fieldSet = this.el.querySelector('fieldset');
    this.#footer = this.el.querySelector('.form-password__footer');
    this.el.addEventListener('submit', this.onSubmit.bind(this));
    this.el.addEventListener('change', () => {
      this.fields.forEach(field => field.validate());
    });
  }

  mounted() {
    this.fields.forEach(field => field.mount(this.#fieldSet));
    this.button.mount(this.#footer);
  }
}
