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

@UseGuards(WsGuard)
@WebSocketGateway({
  cors: true,
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private readonly logger: Logger = new Logger("MessageGateway");

  constructor(
    private readonly informationService: InformationService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly chatService: ChatService,
    private readonly messageService: MessageService,
  ) {}

  async handleDisconnect(client: any) {
    const user = await this.getDataUserFromToken(client);
    await this.informationService.delete(user.id, client);
  }

  afterInit(server: any): any {
    this.logger.log(server, "Init");
  }

  async handleConnection(client: Socket) {
    // console.log(client);
    // const id = this.getCurrentUser())
    const user = await this.getDataUserFromToken(client);
    console.log("user", user);
    this.logger.log(client.id, "Connected..............................");

    // console.log(curr);
    // const information: InformationCreateDto = {
    //   userId: curr.id,
    //   status: false,
    //   value: client.id,
    // };
    // await this.informationService.create(information);
  }

  @SubscribeMessage("private_message")
  async handleMessage(@MessageBody() msg: MessagesInterface) {
    const userIds = await this.chatService.getParticipants(msg.conversationId);
    const socketIds = await this.informationService.findSocketId(userIds);

    const message = await this.messageService.create({
      senderId: msg.userId,
      message: msg.message,
      conversationId: msg.conversationId,
    });

    const emit = this.server;

    socketIds.map(({ value: receiverSocketId }) => {
      emit.to(receiverSocketId).emit("message-received", {
        id: message.id,
        message: message.message,
        senderId: message.senderId,
        conversationId: message.conversationId,
        createdAt: message.createdAt,
      });
    });
  }

  async getDataUserFromToken(client: Socket): Promise<User> {
    // const authToken: any = client.handshake?.query?.token;
    const id = client.handshake?.query?.id.toString();
    console.log("id", client.handshake.query, id);
    try {
      // const decoded = await this.jwtService.verifyAsync(authToken, {
      //   secret: JWT_SECRET,
      // });
      // console.log("decoded", decoded);
      return await this.userService.getUserById(2); // response to function
    } catch (ex) {
      console.log(ex);
      throw new HttpException("Not found", HttpStatus.NOT_FOUND);
    }
  }
}

function parseInt(str: string | string[]): number {
  if (typeof str === "string") return Number.parseInt(str);
}
