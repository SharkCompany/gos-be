import { HttpException, HttpStatus, Logger, UseGuards } from "@nestjs/common";
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { CurrentUser } from "@decorator";
import { User } from "@prisma/client";
import { Server, Socket } from "socket.io";
import { InformationCreateDto } from "@modules/information/dto/createInformation.dto";
import { InformationService } from "@modules/information/information.service";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "@modules/user/user.service";
import { WsGuard } from "./guards/validation";
import { MessagesInterface } from "./dto/message.interface";
import { ChatService } from "./chat.service";
import { MessageService } from "@modules/message/message.service";
import { JWT_SECRET } from "@environments";
import Cache from "./cache";
import { ConversationService } from "@modules/conversation/conversation.service";

@UseGuards(WsGuard)
@WebSocketGateway({
  cors: true,
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private readonly logger: Logger = new Logger(ChatGateway.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly convService: ConversationService,
    private readonly messageService: MessageService,
    private readonly cacheService: Cache,
  ) {}

  async handleDisconnect(client: any) {
    const userId = this.getUserIdFromToken(client);
    this.cacheService.delete(userId);
    console.log(client.id, "Disconnected .................");
  }

  afterInit(server: any): any {
    this.logger.log(server, "Init");
  }

  async handleConnection(client: Socket) {
    const id = this.getUserIdFromToken(client);
    this.cacheService.save(id, client.id);
    this.logger.log(client.id, "Connected..............................");
  }

  @SubscribeMessage("private_message")
  async handleMessage(@MessageBody() msg: MessagesInterface) {
    const conversation = await this.convService.getConversationDetail(
      msg.conversationId,
    );

    const participantIds = conversation.user.map((u) => u.id);
    const userSocketIds = this.cacheService.getValue(participantIds);

    const message = await this.messageService.create({
      senderId: msg.userId,
      message: msg.message,
      conversationId: msg.conversationId,
    });

    const emit = this.server;

    userSocketIds.map((id) => {
      emit.to(id).emit("message-received", {
        id: message.id,
        message: message.message,
        senderId: message.senderId,
        conversationId: message.conversationId,
        createdAt: message.createdAt,
      });
    });
  }

  getUserIdFromToken(client: Socket): number {
    // const authToken: any = client.handshake?.query?.token;
    const token: any = client.handshake?.query?.token;
    console.log("id", client.handshake.query, token);

    const decoded: any = this.jwtService.decode(token);
    if (decoded) throw new HttpException("Invalid token", HttpStatus.NOT_FOUND);
    return decoded;
  }
}
