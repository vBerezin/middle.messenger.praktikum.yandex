export type UserResponse = {
  id: number,
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  phone: string,
  display_name: string | null,
  avatar: string | null,
};

export type BadRequestError = {
  reason: string,
};

export type UsersRequest = {
  users: number[],
  chatId: number,
};
