import { UsersApi } from '~modules/Api/UsersApi';
import { Store } from '~modules/Store';
import { AuthApi } from '~modules/Api';
import { changePasswordRequest, UserUpdateRequest } from '~modules/Api/UsersApi/types';
import { SignInRequest, SignUpRequest } from '~modules/Api/AuthApi/types';
import { StorePaths } from '~modules/Store/types';
import { Events } from '~modules/Events';
import { UserProfileEvents } from '~entities/UserProfile/types';

export class UserProfile extends Events<UserProfileEvents> {
  events = UserProfileEvents;

  data = Store.getState<StorePaths.profile>(Store.paths.profile);

  constructor() {
    super();
    Store.on(Store.events.update, (state) => {
      if (state[Store.paths.profile]) {
        this.data = Store.getState<StorePaths.profile>(Store.paths.profile);
        this.emit(this.events.update, this.data);
      }
    });
  }

  async getData() {
    if (this.data) {
      return this.data;
    }
    return this.identify();
  }

  async signUp(data: SignUpRequest) {
    await AuthApi.signUp(data);
    this.data = await AuthApi.identify();
    this.emit(this.events.create, this.data);
    return this.data;
  }

  async signIn(data: SignInRequest) {
    await AuthApi.signIn(data);
    return AuthApi.identify();
  }

  async signOut() {
    await AuthApi.signOut();
    Store.setState<StorePaths.profile>(Store.paths.profile, undefined);
    this.data = undefined;
    this.emit(this.events.delete, this.data);
  }

  async identify() {
    const userResponse = await AuthApi.identify();
    Store.setState<StorePaths.profile>(Store.paths.profile, userResponse);
    return userResponse;
  }

  async update(data: UserUpdateRequest) {
    const userResponse = await UsersApi.profile(data);
    Store.setState<StorePaths.profile>(Store.paths.profile, userResponse);
    return userResponse;
  }

  async passwordChange(data: changePasswordRequest) {
    return UsersApi.password(data);
  }

  async avatarChange(avatar: File) {
    const data = new FormData();
    data.append('avatar', avatar);
    const userResponse = await UsersApi.profileAvatar(data);
    Store.setState<StorePaths.profile>(Store.paths.profile, userResponse);
    return userResponse;
  }
}
