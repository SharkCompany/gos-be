import { PAGE_MAX_OFFSET } from "@environments";
import { ApiProperty } from "@nestjs/swagger";
import { PaginationDto } from "@shared/pagination";
import { IsNumber } from "class-validator";

export class ChatListGetDto {
  @ApiProperty()
  @IsNumber()
  id: number;
}
