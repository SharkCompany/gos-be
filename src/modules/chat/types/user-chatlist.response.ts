import { ApiProperty } from "@nestjs/swagger";
import { Conversation } from "@prisma/client";
import { Message, Profile } from "@shared/types";

export class ConversationResponse {
  @ApiProperty({ type: Profile, isArray: true })
  participants: any;
  @ApiProperty()
  id: number;
  @ApiProperty({ type: Message, isArray: true })
  messages: any;
  @ApiProperty()
  createdAt: string;
  @ApiProperty()
  updatedAt: string;
}
