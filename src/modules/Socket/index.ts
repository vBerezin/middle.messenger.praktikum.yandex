import { SocketEvents, SocketSendArgs } from './types';

export class Socket {
  events = SocketEvents;

  private socket: WebSocket;

  constructor(url: string) {
    this.socket = new WebSocket(url);
  }

  public on(eventName: keyof typeof SocketEvents, callback: Function) {
    this.socket.addEventListener(eventName, (event) => {
      if ('data' in event) {
        return callback(JSON.parse(event.data));
      }
      return callback(event);
    });
    return this;
  }

  public send(args: SocketSendArgs) {
    this.socket.send(JSON.stringify(args));
    return this;
  }

  public close() {
    return this.socket.close();
  }

  get state() {
    return this.socket.readyState;
  }
}
