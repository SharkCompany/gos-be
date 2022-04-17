import { Module } from "@nestjs/common";
import { DriveHistoryService } from "./drive-history.service";
import { DriveHistoryController } from "./drive-history.controller";

@Module({
  providers: [DriveHistoryService],
  controllers: [DriveHistoryController],
})
export class DriveHistoryModule {}
