import { PrismaService } from "@config/prisma/prisma.service";
import { JWT_SECRET } from "@environments";
import { AuthModule } from "@modules/auth/auth.module";
import { ConversationModule } from "@modules/conversation/conversation.module";
import { MessageModule } from "@modules/message/message.module";
import { UserModule } from "@modules/user/user.module";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import Cache from "./cache";

import { ChatGateway } from "./chat.gateway";
import { ChatService } from "./chat.service";

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
    }),
    ConversationModule,
    MessageModule,
    UserModule,
    AuthModule,
  ],
  // controllers: [ChatController],
  providers: [ChatGateway, ChatService, PrismaService, Cache],
})
export class ChatModule {}
