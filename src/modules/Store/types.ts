import { UserResponse } from '~modules/Api/types';
import { ChatsResponse } from '~modules/Api/ChatsApi/types';

export enum StoreEvents {
  update = 'store:update',
}

export enum StorePaths {
  profile = 'profile',
  chats = 'chats',
  users = 'users',
}

export type StoreState = {
  profile: UserResponse | undefined,
  users: UserResponse[] | [],
  chats: ChatsResponse[] | [],
};
