import { PrismaService } from "@config/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class InformationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(info) {
    return this.prisma.information.create({ data: info });
  }
  async delete(userId: string, value: string) {
    return this.prisma.information.delete({
      where: {
        information: {
          userId,
          value,
        },
      },
    });
  }

  async findSocketId(userIds: string[]) {
    return this.prisma.information.findMany({
      select: { value: true },
      where: {
        userId: { in: userIds },
      },
    });
  }
}
