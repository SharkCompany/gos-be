import { MAX_PRICE } from "@common/constants";
import { ApiProperty } from "@nestjs/swagger";
import { DriveType } from "@prisma/client";
import { IsOptional, Max, Min } from "class-validator";

export class CreateDriveDto {
  @ApiProperty()
  destinationId: number;

  @ApiProperty()
  @IsOptional()
  @Min(0)
  @Max(MAX_PRICE)
  price?: string;

  @ApiProperty({ description: "auto generated, default = true" })
  @IsOptional()
  available?: boolean;

  @ApiProperty()
  timeStart: string;

  @ApiProperty()
  departureId: number;

  @ApiProperty({
    enum: DriveType,
  })
  type: DriveType;
}
