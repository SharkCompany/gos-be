import { ApiProperty } from "@nestjs/swagger";

export class MessageCreateDto {
  @ApiProperty()
  senderId: number;
  @ApiProperty()
  conversationId: number;
  @ApiProperty()
  message: string;
}
