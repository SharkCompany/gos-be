import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class UpdateUserInfoDto {
  @ApiProperty()
  bio: string;
  @ApiProperty()
  licensePlates?: string;
  @ApiProperty()
  picture: string;

  @ApiProperty()
  @IsString()
  phone: string;
}
