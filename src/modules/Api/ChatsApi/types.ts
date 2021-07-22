import { UserResponse } from '~modules/Api/types';

export type ChatsRequest = Partial<{
  offset: number,
  limit: number,
  title: string,
}>;

export type ChatsResponse = {
  id: number
  created_by: number
  title: string
  avatar: string
  unread_count: number
  last_message: {
    user: UserResponse
    time: string
    content: string
  }
};

export type ChatsCreateRequest = {
  title: string,
};

export type ChatsCreateResponse = {
  id: number,
};

export type ChatsTokenResponse = {
  token: string,
};

export type ChatAvatarRequest = {
  chatId: number,
  avatar: File
};

export type ChatsDeleteRequest = {
  chatId: number
};

export type ChatsDeleteResponse = {
  userId: number
  result: ChatsResponse,
};
