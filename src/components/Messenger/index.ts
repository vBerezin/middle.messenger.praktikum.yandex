import './styles';
import template from './template';

import { Component } from '~modules/Component';

import { ChatList } from '~components/ChatList';
import { Dialog } from '~components/Dialog';
import { FormSearch } from '~components/FormSearch';
import { MessengerState } from '~components/Messenger/types';
import { UserProfile } from '~entities/UserProfile';

export class Messenger extends Component<null, MessengerState> {
  private readonly search = new FormSearch();

  private readonly list = new ChatList();

  private readonly profile = new UserProfile();

  private dialogs: Record<number, Dialog> = {};

  constructor() {
    super({ template });
    this.search.on(this.search.events.search, (value) => {
      this.list.search(value);
    });
    this.list.on(this.list.events.chatSelected, async (chatData) => {
      const userData = await this.profile.getData();
      const chatId = chatData.id;
      const userId = userData.id;
      this.search.reset();
      if (!this.dialogs[chatId]) {
        this.dialogs[chatId] = new Dialog({
          chat: chatData,
          user: {
            id: userId,
          },
        });
      }
      const dialog = this.dialogs[chatId];
      dialog.on(dialog.events.chatDelete, (id) => {
        this.setState({ active: null });
        delete this.dialogs[id];
      });
      this.setState({ active: chatId });
      dialog.mount(this.refs.main);
    });
  }

  mounted() {
    this.search.mount(this.refs.search);
    this.list.mount(this.refs.list);
  }
}
