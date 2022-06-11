import { ApiProperty } from "@nestjs/swagger";
import { MessageType } from "@prisma/client";
import { IsOptional } from "class-validator";

export class MessageCreateDto {
  @ApiProperty()
  senderId: number;
  @ApiProperty()
  conversationId: number;
  @ApiProperty()
  message: string;

  @ApiProperty({
    default: MessageType.regular,
    type: MessageType,
  })
  @IsOptional()
  type?: MessageType;
}
