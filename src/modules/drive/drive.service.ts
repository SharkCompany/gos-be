import { PrismaService } from "@config/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { DriveStatus } from "@prisma/client";
import { CreateDriveDto } from "./dto/create-drive.dto";

@Injectable()
export class DriveService {
  constructor(private readonly prisma: PrismaService) {}
  getDrives(status: DriveStatus) {
    return this.prisma.drive.findMany({
      where: {
        status,
      },
    });
  }

  create(data: CreateDriveDto) {
    const mockData = {
      driverId: 10,
      destination: "khanh Hoa",
      price: "1999",
      status: DriveStatus.failed,
      timeStart: new Date(),
    };
    return this.prisma.drive.create({
      data: mockData,
    });
  }

  delete(id: number) {
    return this.prisma.drive.delete({ where: { id } });
  }
}
