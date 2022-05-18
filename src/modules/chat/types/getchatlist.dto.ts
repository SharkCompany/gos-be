import { PAGE_MAX_OFFSET } from "@environments";
import { ApiProperty } from "@nestjs/swagger";
import { PaginationDto } from "@shared/pagination";

export class ChatListGetDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  limit = PAGE_MAX_OFFSET;
  @ApiProperty()
  page = 1;
}
