import { HTTP } from '~modules/HTTP';
import {
  ChatsTokenResponse,
  ChatsRequest,
  ChatsResponse,
  ChatsDeleteResponse,
  ChatsDeleteRequest,
  ChatsCreateRequest,
  ChatsCreateResponse,
} from './types';
import { UsersRequest } from '~modules/Api/types';

const API_URL = 'https://ya-praktikum.tech/api/v2/chats';

export const ChatsApi = {
  async getChats(data?: ChatsRequest): Promise<ChatsResponse[]> {
    const request = await HTTP.get(API_URL, {
      data,
      withCredentials: true,
    });
    return JSON.parse(request.response);
  },
  async createChat(data: ChatsCreateRequest): Promise<ChatsCreateResponse> {
    const request = await HTTP.post(API_URL, {
      data: JSON.stringify(data),
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return JSON.parse(request.response);
  },
  async addUsers(data: UsersRequest) {
    return HTTP.put(`${API_URL}/users`, {
      data: JSON.stringify(data),
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  async getToken(chatId: number): Promise<ChatsTokenResponse> {
    const request = await HTTP.post(`${API_URL}/token/${chatId}`, {
      withCredentials: true,
      headers: {
        accept: 'application/json',
      },
    });
    return JSON.parse(request.response);
  },
  async deleteChat(data: ChatsDeleteRequest): Promise<ChatsDeleteResponse> {
    const request = await HTTP.delete(API_URL, {
      data: JSON.stringify(data),
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return JSON.parse(request.response);
  },
};
