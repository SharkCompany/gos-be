import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";

@WebSocketGateway()
export class ChatGateway {
  // @WebSocketServer()
  // server;
  // @SubscribeMessage("private_sender"){
  // }
}
