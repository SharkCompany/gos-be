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

  findMe(id: number) {
    return this.prisma.user.findFirst({
      where: { id: id },
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

  updateImage(id: number, imgUrl: string) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        picture: imgUrl,
      },
    });
  }

  async getUserById(id: number) {
    return this.prisma.user.findFirst({ where: { id: id } });
  }
}
