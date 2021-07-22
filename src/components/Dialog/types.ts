import { ChatsResponse } from '~modules/Api/ChatsApi/types';

export enum DialogEvents {
  chatDelete = 'dialog.chat:delete',
}

export type DialogProps = {
  user: {
    id: number
  },
  chat: ChatsResponse,
};

export type DialogState = {
  chat: ChatsResponse | null,
};
