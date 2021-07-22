import './styles';
import template from './template';
import { FormAvatarState } from './types';

import { Component } from '~modules/Component';
import { Store } from '~modules/Store';
import { PopupFile } from '~components/PopupFile';
import { App } from '~modules/App';
import { UserProfile } from '~entities/UserProfile';

export class FormAvatar extends Component<null, FormAvatarState> {
  private popup: PopupFile;

  constructor(props?) {
    super({
      template,
      props,
      state: {
        image: Store.state.profile?.avatar || undefined,
        title: Store.state.profile?.display_name || undefined,
      },
    });
    this.popup = new PopupFile({
      form: {
        input: {
          name: 'avatar',
          accept: ['.png', '.jpg'],
        },
        button: {
          text: 'Поменять',
        },
        submit: (event, state) => {
          event.preventDefault();
          return this.onSubmit(state.value.file);
        },
      },
    });
    Store.on(Store.events.profileUpdate, (data) => {
      this.setState({
        image: data.avatar,
        title: data.display_name,
      });
    });
  }

  onSubmit(file) {
    UserProfile
      .avatarChange(file)
      .then((response) => {
        if (response.avatar) {
          this.setState({
            image: response.avatar,
          });
        }
        this.popup.reset().hide();
      })
      .catch(App.error);
  }

  'click:popup'() {
    this.popup.reset().show();
  }

  mounted() {
    this.popup.mount(document.body);
  }
}
