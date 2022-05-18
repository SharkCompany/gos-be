import { ApiProperty } from "@nestjs/swagger";
import { PaginationDto } from "@shared/pagination";

export class Message {
  @ApiProperty()
  id: string;
  @ApiProperty()
  message: string;
  @ApiProperty()
  conversationId: string | null;
  @ApiProperty()
  status: boolean;
  @ApiProperty()
  senderId: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

export class Profile {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string | null;
  @ApiProperty()
  picture: string | null;
  @ApiProperty()
  gender: string | null;
  @ApiProperty()
  phone: string | null;
  @ApiProperty()
  followingIDs: string[];
  followedByIDs: string[];
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  conversationId: string | null;
}

export class Conversation {
  @ApiProperty()
  id: string;
  @ApiProperty({ type: Profile, isArray: true })
  participants: any;
  @ApiProperty({ type: Message, isArray: true })
  messages: any;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
}

class MessageCount {
  message: number;
}
export class ConversationMessage extends Conversation {
  @ApiProperty({ description: "_count: {message:number}" })
  _count: MessageCount;
}
