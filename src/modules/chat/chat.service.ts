import { PrismaService } from "@config/prisma/prisma.service";
import { CurrentUser } from "@decorator";
import { PAGE_MAX_OFFSET } from "@environments";
import { Param } from "@nestjs/common";
import { Conversation, Message } from "@prisma/client";
import { Pagination, PaginationOptions } from "@shared/pagination";

export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async getConversations(userId: number) {
    const conversations = await this.prisma.user.findFirst({
      select: {
        conversation: {
          select: {
            id: true,
          },
        },
      },
      where: {
        id: userId,
      },
    });

    const conversationIds = conversations.conversation.map((c) => c.id);
    const chatlist = await this.prisma.conversation.findMany({
      where: {
        AND: [
          {
            id: {
              in: conversationIds,
            },
          },
          {
            userId: {
              not: userId,
            },
          },
        ],
      },
      include: {
        user: true,
      },
    });
    return chatlist;
  }

  /**
   *
   * @param id conversationid
   * @param option pagination option
   * @returns conversation with lasted 20 message
   */
  async getMessages(id: number, option: PaginationOptions) {
    const results = await this.prisma.conversation.findFirst({
      where: { id },
      include: {
        messages: {
          take: option.limit,
          skip: option.page * PAGE_MAX_OFFSET,
          orderBy: {
            createdAt: "desc",
          },
        },
        _count: {
          select: { messages: true },
        },
      },
    });
    return results;
  }

  async createConversation(me: number, you: number) {
    return this.prisma.conversation.create({
      data: {
        participants: {
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

  // get participants in provided conversation
  async getParticipants(conversationId: number) {
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        id: conversationId,
      },
      select: {
        id: true,
        participants: {
          select: {
            id: true,
          },
        },
      },
    });

    const participantIds = conversation.participants.map((p) => p.id);
    return participantIds;
  }
}
