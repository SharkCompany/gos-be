import { PrismaService } from "@config/prisma/prisma.service";
import { MessageCreateDto } from "@modules/message/dto/create-message.dto";
import { MessageService } from "@modules/message/message.service";
import { Injectable } from "@nestjs/common";
import { Conversation, Message, Prisma, User } from "@prisma/client";

@Injectable()
export class ConversationService {
  constructor(
    private readonly _prisma: PrismaService,
    private readonly _message: MessageService,
  ) {}

  async getConversation(userId: number): Promise<Conversation[]> {
    return this._prisma.conversation.findMany({
      where: {
        user: {
          some: {
            id: userId,
          },
        },
      },
    });
  }

  async getConversationDetail(converationId: number): Promise<
    Conversation & {
      user: User[];
      messages: Message[];
    }
  > {
    return this._prisma.conversation.findFirst({
      where: {
        id: converationId,
      },
      include: {
        user: true,
        messages: true,
      },
    });
  }

  async createConversation(me: number, you: number) {
    const oldConversation = await this.findConversationByUser([me, you]);
    console.log("conversatoin found: ", oldConversation);

    if (oldConversation) {
      this.addReturnMessage(oldConversation.id);
      return oldConversation;
    } else
      return this._prisma.conversation.create({
        data: {
          user: {
            connect: [
              {
                id: me,
              },
              {
                id: you,
              },
            ],
          },
        },
      });
  }

  async findConversationByUser(
    userids: number[],
  ): Promise<{ id: number } | undefined> {
    const result = await this._prisma.$queryRaw<{ A: number }[] | undefined>(
      Prisma.sql`SELECT
      DB1.A FROM _ConversationToUser DB1
        INNER JOIN _ConversationToUser DB2
               ON DB1.A = DB2.A
        WHERE DB1.B = ${userids[0]} AND DB2.B = ${userids[1]}`,
    );

    return result.length > 0 ? { id: result[0].A } : undefined;
  }

  async addReturnMessage(conversationId: number) {
    const msg: MessageCreateDto = {
      conversationId,
      type: "system",
      senderId: -1,
      message: "Connected at " + new Date().toDateString(),
    };
    this._message.create(msg);
  }
}
