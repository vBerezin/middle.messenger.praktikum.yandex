import { FormAuth } from '~components/FormAuth';
import { Validate } from '~modules/Validate';
import { ROUTES } from '~common/scripts/routes';
import { Router } from '~modules/Router';
import { UserProfile } from '~entities/UserProfile';

const profile = new UserProfile();

export const formSignUp = new FormAuth({
  title: 'Регистрация',
  fields: [
    {
      label: 'Почта',
      id: 'form.signup[email]',
      name: 'email',
      type: 'email',
      validate: Validate.field.email,
    },
    {
      label: 'Логин',
      id: 'form.signup[login]',
      name: 'login',
      type: 'text',
      required: true,
      validate: Validate.field.login,
    },
    {
      label: 'Имя',
      id: 'form.signup[first_name]',
      name: 'first_name',
      type: 'text',
    },
    {
      label: 'Фамилия',
      id: 'form.signup[second_name]',
      name: 'second_name',
      type: 'text',
    },
    {
      label: 'Телефон',
      id: 'form.signup[phone]',
      name: 'phone',
      type: 'tel',
      required: true,
      validate: Validate.field.phone,
    },
    {
      label: 'Пароль',
      id: 'form.signup[password]',
      name: 'password',
      type: 'password',
      required: true,
      validate: Validate.field.password,
    },
    {
      label: 'Пароль (ещё раз)',
      id: 'form.signup[password_confirm]',
      name: 'password_confirm',
      type: 'password',
      required: true,
      validate(value) {
        const form = this.el.closest('form');
        const password = form.password.value;
        return value === password ? null : 'Пароли не совпадают';
      },
    },
  ],
  buttons: [
    {
      mods: 'block',
      text: 'Зарегистрироваться',
      attributes: {
        type: 'submit',
      },
    },
    {
      text: 'Войти',
      mods: ['block', 'white'],
      attributes: {
        href: ROUTES.auth.signin,
      },
    },
  ],
  submit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    profile
      .signUp(data)
      .then(() => {
        Router.go(ROUTES.messenger);
      })
      .catch((xhr) => {
        const response = JSON.parse(xhr.response);
        this.setState({
          errors: [response.reason],
        });
      });
  },
});
