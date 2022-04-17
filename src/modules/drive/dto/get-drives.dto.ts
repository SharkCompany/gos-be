import { ApiProperty } from "@nestjs/swagger";
import { DriveStatus } from "@prisma/client";
import { IsBoolean, IsDateString, IsOptional } from "class-validator";

export class GetDrivesDto {
  @IsBoolean()
  @ApiProperty({ required: false })
  available = true;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  timeStart?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  destination?: string;

  @ApiProperty({ required: false, enum: DriveStatus })
  @IsOptional()
  status: DriveStatus;
}
