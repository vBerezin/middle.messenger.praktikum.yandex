import './styles';
import template from './template';
import { ProfileInfoState } from './types';

import { Component } from '~modules/Component';
import { UserProfile } from '~entities/UserProfile';

const KEYS = [
  {
    label: 'Почта',
    name: 'email',
  },
  {
    label: 'Логин',
    name: 'login',
  },
  {
    label: 'Имя',
    name: 'first_name',
  },
  {
    label: 'Фамилия',
    name: 'second_name',
  },
  {
    label: 'Имя в чате',
    name: 'display_name',
  },
  {
    label: 'Телефон',
    name: 'phone',
  },
];

export class ProfileInfo extends Component<null, ProfileInfoState> {
  private readonly profile = new UserProfile();

  constructor() {
    super({
      template,
      state: {
        fields: KEYS,
      },
    });
    this.profile
      .getData()
      .then((data) => {
        this.data = data;
      });
    this.profile.on(this.profile.events.update, (data) => {
      this.data = data;
    });
  }

  makeFields(data) {
    return KEYS.map((key) => ({
      ...key,
      value: data[key.name],
    }));
  }

  set data(data) {
    const fields = this.makeFields(data);
    this.setState({ fields });
  }
}
