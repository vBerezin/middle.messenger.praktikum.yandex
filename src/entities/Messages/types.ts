import { MessagesConnectRequest } from '~modules/Api/MessagesApi/types';

export enum MessagesEvents {
  connect = 'messages:connect',
  send = 'messages:send',
  userConnected = 'messages:user.connected',
  received = 'messages:received',
}

export type MessagesConnectProps = Pick<MessagesConnectRequest, 'user' | 'chat'>;
