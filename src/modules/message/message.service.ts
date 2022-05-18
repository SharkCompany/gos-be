import { PrismaService } from "@config/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { MessageCreateDto } from "./dto/create-message.dto";

@Injectable()
export class MessageService {
  constructor(private readonly prisma: PrismaService) {}

  create(info: MessageCreateDto) {
    return this.prisma.message.create({ data: info });
  }
}
