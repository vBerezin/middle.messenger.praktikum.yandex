import { ChatsApi, MessagesApi } from '~modules/Api';
import { MessagesConnectProps, MessagesEvents } from '~entities/Messages/types';
import { Socket } from '~modules/Socket';
import { Events } from '~modules/Events';

export class Messages extends Events<MessagesEvents> {
  events = MessagesEvents;

  private ping;

  private socket: Socket;

  private readonly connect: Promise<Socket>;

  constructor(props: MessagesConnectProps) {
    super();
    this.connect = ChatsApi
      .getToken(props.chat.id)
      .then(({ token }) => MessagesApi.connect({
        token,
        chat: props.chat,
        user: props.user,
      }))
      .then((socket) => {
        socket.on(socket.events.message, (data) => {
          if (data.type === 'message' || Array.isArray(data)) {
            this.emit(this.events.received, data);
          }
          if (data.type === 'user connected') {
            this.emit(this.events.userConnected, data);
          }
        });
        this.ping = setInterval(() => MessagesApi.ping(socket), 1000);
        this.socket = socket;
        this.emit(this.events.connect);
        return socket;
      });
  }

  getMessages(offset = 0) {
    this.connect
      .then((socket) => {
        socket.send({
          type: 'get old',
          content: `${offset}`,
        });
      });
  }

  disconnect() {
    clearInterval(this.ping);
    this.ping = null;
    return this.socket.close();
  }

  async sendMessage(message: string) {
    await MessagesApi.sendMessage(message, this.socket);
    this.emit(this.events.send, message);
  }
}
