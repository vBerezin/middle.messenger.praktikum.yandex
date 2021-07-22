import { ChatsResponse } from '~modules/Api/ChatsApi/types';
import { UserResponse } from '~modules/Api/types';

export type ChatListState = {
  active?: number,
  chats: ChatsResponse[],
  users: UserResponse[],
};

export enum ChatListEvents {
  chatSelected = 'chat.list.chat:selected',
  chatDeleted = 'chat.list.chat:deleted',
}
