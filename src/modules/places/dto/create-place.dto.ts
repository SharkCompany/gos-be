import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString, IsString } from "class-validator";

export class CreatePlaceDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNumberString()
  latitude: string;

  @ApiProperty()
  @IsNumberString()
  longitude: string;
}
