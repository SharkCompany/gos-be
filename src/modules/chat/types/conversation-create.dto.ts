import { ApiProperty } from "@nestjs/swagger";

export class ConversationCreate {
  @ApiProperty()
  id: number;
}
