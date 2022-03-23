import { DriveStatus } from "@common/drive/drive-status";
import { Args, ArgsType, Field, ID } from "@nestjs/graphql";
import { stringify } from "querystring";

@ArgsType()
class GetDriveDetailArgs {
  id: string;

  status: string;

  passengerId: string;

  driverId: string;

  driveId: string;
}
