import { PrismaService } from "@config/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { UpdateUserInfoDto } from "./dto/updateUserInfoDto";

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

  findMe(email: string) {
    return this.prisma.user.findFirst({
      where: { email: email },
    });
  }

  updateInfo(id: number, inf: UpdateUserInfoDto) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...inf,
      },
    });
  }
}
