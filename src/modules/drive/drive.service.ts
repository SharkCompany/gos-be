import { PrismaService } from "@config/prisma/prisma.service";
import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { DriveStatus } from "@prisma/client";
import { CreateDriveDto } from "./dto/create-drive.dto";
import { GetDrivesDto } from "./dto/get-drives.dto";
@Injectable()
export class DriveService {
  constructor(private readonly prisma: PrismaService) {}
  getDrives(query: Partial<GetDrivesDto>) {
    return this.prisma.drive.findMany({
      where: {
        ...query,
      },
    });
  }

  async create(creatorId: number, data: CreateDriveDto) {
    const drive = await this.prisma.drive.create({
      data: {
        ...data,
        creator: {
          connect: {
            id: creatorId,
          },
        },
        driveHistory: {
          create: {
            status: DriveStatus.waiting,
          },
        },
      },
      include: {
        creator: true,
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
  async matchDrive(driveId: number, matcher: number) {
    const drive = await this.prisma.drive.findFirst({
      where: {
        id: driveId,
      },
    });
    if (drive.available)
      throw new HttpException("drive already matched", HttpStatus.FORBIDDEN);

    await this.prisma.drive.update({
      where: {
        id: driveId,
      },
      data: {
        matcher: {
          connect: {
            id: matcher,
          },
        },
        available: false,
      },
    });

    return this.prisma.driveHistory.create({
      data: {
        drive: {
          connect: {
            id: drive.id,
          },
        },
        status: DriveStatus.matched,
      },
      include: {
        drive: {
          include: {
            matcher: true,
            creator: true,
          },
        },
      },
    });
  }
}
