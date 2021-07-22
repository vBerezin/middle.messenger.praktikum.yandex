import { UserResponse } from '~modules/Api/types';

export type UserUpdateRequest = Omit<UserResponse, 'id'>;

export type ChangePasswordRequest = {
  oldPassword: string,
  newPassword: string
};

export type AvatarChangeRequest = FormData;

export type FindUserRequest = Pick<UserResponse, 'login'>;
