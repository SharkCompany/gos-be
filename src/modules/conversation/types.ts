import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class JoinConversationDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}
