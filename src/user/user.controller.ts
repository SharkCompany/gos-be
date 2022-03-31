import { CurrentUser } from "@decorator";
import { PrismaService } from "@config/prisma/prisma.service";
import { Controller, Get } from "@nestjs/common";
import { PrismaClient, User } from "@prisma/client";

@Controller()
export class UserController {
  constructor(private readonly prisma: PrismaService) {}

  @Get("me")
  async me(@CurrentUser() user: User) {
    return this.prisma.user.findFirst({ where: { id: user.id } });
  }
}
