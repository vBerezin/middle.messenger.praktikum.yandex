import { UsersApi } from '~modules/Api/UsersApi';
import { findUserRequest } from '~modules/Api/UsersApi/types';

export class Users {
  async getUser(id: number) {
    return UsersApi.getUser(id);
  }

  async search(data: findUserRequest) {
    return UsersApi.search(data);
  }
}
