import { ApiProperty } from "@nestjs/swagger";

export class Message {
  @ApiProperty()
  id: string;
  @ApiProperty()
  message: string;
  @ApiProperty()
  conversationId: string | null;
  @ApiProperty()
  senderId: string;
  @ApiProperty()
  createdAt: Date;
}

export class User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  licensePlates: string;

  @ApiProperty()
  bio: string;
  @ApiProperty()
  picture: string;
  @ApiProperty({
    type: Date,
  })
  createdAt: string;
  @ApiProperty({
    type: Date,
  })
  updatedAt: string;
}

export class Conversation {
  @ApiProperty()
  id: string;
  @ApiProperty({ type: User, isArray: true })
  users: any;
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

export enum DriveType {
  waiting,
  preparing,
}
