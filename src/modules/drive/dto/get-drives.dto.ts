import { ApiProperty } from "@nestjs/swagger";
import { DriveStatus, DriveType } from "@prisma/client";
import { Type } from "class-transformer";
import {
  IsBoolean,
  IsBooleanString,
  IsDateString,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
} from "class-validator";

export class GetDrivesDto {
  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  available?: boolean;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  timeStart?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  destinationId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  departureId?: number;

  @ApiProperty({ required: false, enum: DriveType })
  @IsOptional()
  @IsEnum(DriveType)
  type?: DriveType;

  @IsOptional()
  @IsNumber()
  creatorId?: number;
}
