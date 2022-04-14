import { PrismaService } from "@config/prisma/prisma.service";
import { Module } from "@nestjs/common";
import { DriveController } from "./drive.controller";
import { DriveService } from "./drive.service";

@Module({
  controllers: [DriveController],
  providers: [DriveService, PrismaService],
})
export class DriveModule {}
