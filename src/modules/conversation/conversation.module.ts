import { Module } from "@nestjs/common";
import { ConversationService } from "./conversation.service";
import { ConversationController } from "./conversation.controller";
import { PrismaService } from "@config/prisma/prisma.service";
import { UserModule } from "@modules/user/user.module";
import { MessageModule } from "@modules/message/message.module";

@Module({
  providers: [ConversationService, PrismaService],
  controllers: [ConversationController],
  exports: [ConversationService],
  imports: [UserModule, MessageModule],
})
export class ConversationModule {}
