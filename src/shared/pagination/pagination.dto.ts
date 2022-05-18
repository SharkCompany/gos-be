import { PAGE_MAX_OFFSET } from "@environments";
import { ApiProperty } from "@nestjs/swagger";

export class PaginationDto {
  @ApiProperty({
    default: PAGE_MAX_OFFSET,
    minimum: 20,
  })
  limit: number = PAGE_MAX_OFFSET;
  @ApiProperty({
    minimum: 1,
    type: Number,
  })
  page = 1;
}
