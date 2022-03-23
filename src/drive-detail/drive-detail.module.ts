import { Module } from "@nestjs/common";
import { DriveDetailService } from "./drive-detail.service";
import { DriveDetailResolver } from "./drive-detail.resolver";

@Module({
  providers: [DriveDetailResolver, DriveDetailService],
})
export class DriveDetailModule {}
