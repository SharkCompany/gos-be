import { PrismaService } from "@config/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { DriveStatus } from "@prisma/client";
import { CreateDriveDto } from "./dto/create-drive.dto";
import { GetDrivesDto } from "./dto/get-drives.dto";
@Injectable()
export class DriveService {
  constructor(private readonly prisma: PrismaService) {}
  getDrives(query: GetDrivesDto) {
    return this.prisma.drive.findMany({
      where: {
        ...query,
      },
    });
  }

  async create(data: CreateDriveDto & { driveId: number }) {
    const drive = await this.prisma.drive.create({
      data: {
        ...data,
        driveHistory: {
          create: {
            status: DriveStatus.waiting,
          },
        },
      },
    });

    return drive;
  }

  delete(id: number) {
    return this.prisma.drive.delete({ where: { id } });
  }

  /**
   * change drive availability then commit to drive history
   * @param id drive id
   * @returns drive object
   */
  async matchDrive(id: number, passengerId: number) {
    const drive = await this.prisma.drive.update({
      where: {
        id,
      },
      data: {
        available: false,
        passengerId,
        driveHistory: {
          create: {
            status: DriveStatus.preparing,
          },
        },
      },
    });

    return drive;
  }
}
