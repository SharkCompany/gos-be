import { ApiProperty } from "@nestjs/swagger";
import { DriveStatus } from "@prisma/client";

export class CreateDriveDto {
  @ApiProperty()
  destination: string;
  @ApiProperty()
  price?: string;
  @ApiProperty()
  status: DriveStatus;
  @ApiProperty()
  timeStart: string;
  @ApiProperty()
  passengerId?: number;
  @ApiProperty()
  driverId: number;
}
