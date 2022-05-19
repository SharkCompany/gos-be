import { PrismaService } from "@config/prisma/prisma.service";
import { JWT_SECRET } from "@environments";
import { InformationModule } from "@modules/information/information.module";
import { InformationService } from "@modules/information/information.service";
import { MessageModule } from "@modules/message/message.module";
import { MessageService } from "@modules/message/message.service";
import { UserModule } from "@modules/user/user.module";
import { UserService } from "@modules/user/user.service";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ChatController } from "./chat.controller";
import { ChatGateway } from "./chat.gateway";
import { ChatService } from "./chat.service";

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
    }),
    InformationModule,
    MessageModule,
    UserModule,
  ],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService, PrismaService],
})
export class ChatModule {}
