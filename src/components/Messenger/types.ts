import { ChatsResponse } from '~modules/Api/ChatsApi/types';

export type MessengerState = {
  active: Pick<ChatsResponse, 'id'> | null
};
