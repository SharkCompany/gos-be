import { PrismaService } from "@config/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

import { User } from "@prisma/client";
import { resolve } from "path";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
