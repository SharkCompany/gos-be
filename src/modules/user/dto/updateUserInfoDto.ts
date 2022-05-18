import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsPhoneNumber } from "class-validator";

export class UpdateUserInfoDto {
  @ApiProperty()
  bio: string;
  @ApiProperty()
  licensePalate: string;
  @ApiProperty()
  picture: string;

  @ApiProperty()
  @IsPhoneNumber()
  phone: string;

  @IsOptional()
  picture?: string;
}
