import { ChatsApi } from '~modules/Api';
import {
  ChatsCreateRequest,
} from '~modules/Api/ChatsApi/types';
import { Store } from '~modules/Store';
import { StorePaths } from '~modules/Store/types';
import { Events } from '~modules/Events';
import { ChatsEvents } from '~entities/Chats/types';

export class Chats extends Events<ChatsEvents> {
  events = ChatsEvents;

  chats = Store.getState<StorePaths.chats>(Store.paths.chats);

  search = ChatsApi.getChats;

  addUsers = ChatsApi.addUsers;

  constructor() {
    super();
    Store.on(Store.events.update, (state) => {
      if (state[Store.paths.chats]) {
        this.chats = Store.getState<StorePaths.chats>(Store.paths.chats);
        this.emit(this.events.update, this.chats);
      }
    });
  }

  async getChats() {
    const chats = await ChatsApi.getChats();
    Store.setState<StorePaths.chats>(Store.paths.chats, chats);
    return chats;
  }

  async createChat(data: ChatsCreateRequest) {
    const response = await ChatsApi.createChat(data);
    const chats = await ChatsApi.getChats();
    const newChat = chats.find((chat) => chat.id === response.id);
    this.emit(this.events.create, newChat);
    Store.setState<StorePaths.chats>(Store.paths.chats, chats);
    return response;
  }

  async deleteChat(data: { id: number }) {
    const response = await ChatsApi.deleteChat({
      chatId: data.id,
    });
    const chats = Store.getState<StorePaths.chats>(Store.paths.chats);
    if (chats) {
      const state = chats.filter((chat) => chat.id !== data.id);
      this.emit(this.events.delete, response.result);
      Store.setState<StorePaths.chats>(Store.paths.chats, state);
    }
    return response;
  }
}
