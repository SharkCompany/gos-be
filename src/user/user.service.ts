import { PrismaService } from "@config/prisma/prisma.service";
import { CreateUserInput, UpdateUserInput } from "@dto/user";
import { Injectable } from "@nestjs/common";

import { User } from "@prisma/client";
import { resolve } from "path";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserInput: CreateUserInput): Promise<string> {
    // return this.prisma.user.create({
    //   data: {
    //     name: "khuong duy",
    //     email: "duy1@gmail.com",

    //   },
    // });
    return new Promise((resolve, reject) => resolve("user string"));
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
