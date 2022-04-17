import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Min } from "class-validator";

export class MatchDriveDto {
  @ApiProperty({ description: "Drive id" })
  @IsNumber()
  @Min(0)
  id: number;
}
