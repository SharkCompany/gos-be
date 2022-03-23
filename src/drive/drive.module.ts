import { Module } from "@nestjs/common";
import { DriveService } from "./drive.service";
import { DriveResolver } from "./drive.resolver";

@Module({
  providers: [DriveResolver, DriveService],
})
export class DriveModule {}
