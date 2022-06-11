import { PrismaService } from "@config/prisma/prisma.service";
import { ConversationModule } from "@modules/conversation/conversation.module";
import { Module } from "@nestjs/common";
import { DriveController } from "./drive.controller";
import { DriveService } from "./drive.service";

@Module({
  controllers: [DriveController],
  providers: [DriveService, PrismaService],
  imports: [ConversationModule],
})
export class DriveModule {}
