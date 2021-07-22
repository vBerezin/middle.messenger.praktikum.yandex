export enum SocketEvents {
  open = 'open',
  close = 'close',
  message = 'message',
  error = 'error',
}

export type SocketSendArgs = {
  content?: string,
  type: string
};
