import { HTTP } from '~modules/HTTP';

import { UserResponse } from '~modules/Api/types';
import { SignInRequest, SignUpRequest, SignUpResponse } from './types';

const API_URL = 'https://ya-praktikum.tech/api/v2/auth';

export const AuthApi = {
  async signUp(data: SignUpRequest): Promise<SignUpResponse> {
    const request = await HTTP.post(`${API_URL}/signup`, {
      data: JSON.stringify(data),
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return JSON.parse(request.response);
  },

  async signIn(data: SignInRequest) {
    return HTTP.post(`${API_URL}/signin`, {
      data: JSON.stringify(data),
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  async signOut() {
    return HTTP.post(`${API_URL}/logout`, {
      withCredentials: true,
    });
  },

  async identify(): Promise<UserResponse> {
    const request = await HTTP.get(`${API_URL}/user`, {
      withCredentials: true,
    });
    return JSON.parse(request.response);
  },
};
