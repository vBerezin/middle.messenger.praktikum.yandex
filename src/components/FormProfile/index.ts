import './styles';
import template from './template';
import { FormProfileState } from './types';

import { Component } from '~modules/Component';

import { FormField } from '~components/FormField';
import { Button } from '~components/Button';
import { App } from '~modules/App';
import { Validate } from '~modules/Validate';
import { FormFieldProps } from '~components/FormField/types';
import { Router } from '~modules/Router';
import { ROUTES } from '~common/scripts/routes';
import { UserProfile } from '~entities/UserProfile';

const KEYS = [
  {
    label: 'Почта',
    name: 'email',
    id: 'formProfile[email]',
    type: 'email',
    validate: Validate.field.email,
  },
  {
    label: 'Логин',
    name: 'login',
    id: 'formProfile[login]',
    type: 'text',
    required: true,
    validate: Validate.field.login,
  },
  {
    label: 'Имя',
    name: 'first_name',
    id: 'formProfile[first_name]',
    type: 'text',
  },
  {
    label: 'Фамилия',
    name: 'second_name',
    id: 'formProfile[second_name]',
    type: 'text',
  },
  {
    label: 'Имя в чате',
    name: 'display_name',
    id: 'formProfile[display_name]',
    type: 'text',
  },
  {
    label: 'Телефон',
    name: 'phone',
    id: 'formProfile[phone]',
    type: 'tel',
    required: true,
    validate: Validate.field.phone,
  },
];

export class FormProfile extends Component<null, FormProfileState> {
  private readonly profile = new UserProfile();

  private readonly button: Button;

  private fields: FormField[];

  private keys: FormFieldProps[];

  constructor() {
    super({ template });
    this.button = new Button({
      class: 'form-profile__submit',
      mods: ['blue', 'block'],
      text: 'Сохранить',
      attributes: {
        type: 'submit',
      },
    });
    this.keys = KEYS;
  }

  async getFields() {
    const data = await this.profile.identify();
    if (!this.fields) {
      this.fields = this.keys.map((key) => new FormField({
        ...key,
        class: 'form-profile__field',
        value: data[key.name],
      }));
      return this.fields;
    }
    this.fields.forEach((field) => {
      field.setState({ value: data[field.props.name] });
    });
    return this.fields;
  }

  validate() {
    const fields = this.fields.filter((field) => {
      field.validate();
      return !field.valid && field.props.required;
    });
    return !fields.length;
  }

  onSubmit(event) {
    if (!this.validate()) {
      return false;
    }
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    this.profile
      .update(data)
      .then(() => {
        Router.go(ROUTES.user.profile);
      })
      .catch(App.error);
  }

  created() {
    this.el.addEventListener('submit', this.onSubmit.bind(this));
    this.el.addEventListener('change', () => {
      this.fields.forEach((field) => field.validate());
    });
  }

  mounted() {
    this
      .getFields()
      .then((fields) => {
        fields.forEach((field) => field.mount(this.refs.fieldset));
        this.button.mount(this.refs.footer);
      })
      .catch(App.error);
  }
}
