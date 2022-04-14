import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber } from "class-validator";

export class UpdateUserInfoDto {
  @ApiProperty()
  bio: string;
  @ApiProperty()
  licensePalate: string;
  @ApiProperty()
  avatar: string;

  @ApiProperty()
  @IsPhoneNumber()
  phone: string;
}
