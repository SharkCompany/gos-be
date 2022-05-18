import { PrismaService } from "@config/prisma/prisma.service";
import { Module } from "@nestjs/common";
import { MessageService } from "./message.service";

@Module({
  providers: [MessageService, PrismaService],
  exports: [MessageService],
})
export class MessageModule {}
