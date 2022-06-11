import { PrismaService } from "@config/prisma/prisma.service";
import { PAGE_MAX_OFFSET } from "@environments";
import { Injectable } from "@nestjs/common";
import { PaginationOptions } from "@shared/pagination";

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  // async getConversations(userId: number) {
  //   const conversations = await this.prisma.user.findFirst({
  //     select: {
  //       conversation: {
  //         select: {
  //           id: true,
  //         },
  //       },
  //     },
  //     where: {
  //       id: userId,
  //     },
  //   });

  //   const conversationIds = conversations.conversation.map((c) => c.id);

  //   const chatlist = await this.prisma.conversation.findMany({
  //     where: {
  //       AND: [
  //         {
  //           id: {
  //             in: conversationIds,
  //           },
  //         },
  //         {
  //           user: {
  //             some: {
  //               id: {
  //                 not: userId,
  //               },
  //             },
  //           },
  //         },
  //       ],
  //     },
  //     include: {
  //       user: true,
  //     },
  //   });
  //   return chatlist;
  // }

  // /**
  //  *
  //  * @param id conversationid
  //  * @param option pagination option
  //  * @returns conversation with lasted 20 message
  //  */
  // async getMessages(id: number) {
  //   const results = await this.prisma.conversation.findFirst({
  //     where: { id },
  //     include: {
  //       messages: {
  //         take: 50,
  //         orderBy: {
  //           createdAt: "desc",
  //         },
  //       },
  //       _count: {
  //         select: { messages: true },
  //       },
  //     },
  //   });
  //   return results;

  // get participants in provided conversation
  async getParticipants(conversationId: number) {
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        id: conversationId,
      },
      select: {
        id: true,
        user: {
          select: {
            id: true,
          },
        },
      },
    });

    const participantIds = conversation.user.map((p) => p.id);
    return participantIds;
  }
}
