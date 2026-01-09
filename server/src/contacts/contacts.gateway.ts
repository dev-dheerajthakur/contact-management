import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // or ['http://localhost:3000']
    methods: ['GET', 'POST'],
    credentials: true,
    transports: ['websocket', 'polling'],
  },
})
export class ContactsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    return 'Hello world!';
  }

  emitContactCreated(data: any) {
    console.log('SERVER INSTANCE:');
    if (!this.server) {
      console.error('Socket server not ready');
      return;
    }
    this.server.emit('contact-created', data);
  }
}
