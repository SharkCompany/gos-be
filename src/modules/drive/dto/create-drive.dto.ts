import { MAX_PRICE } from "@common/constants";
import { ToBoolean } from "@decorator";
import { ApiProperty } from "@nestjs/swagger";
import { DriveType } from "@prisma/client";
import { Transform, Type } from "class-transformer";
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  Max,
  Min,
} from "class-validator";

export class CreateDriveDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  destinationId: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  @Max(MAX_PRICE)
  price?: number;

  @ApiProperty({ description: "auto generated, default = true" })
  @IsOptional()
  @IsBoolean()
  @ToBoolean()
  available?: boolean;

  @ApiProperty()
  @IsDateString()
  timeStart: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  departureId: number;

  @ApiProperty({
    enum: DriveType,
  })
  @IsEnum(DriveType)
  type: DriveType;
}
