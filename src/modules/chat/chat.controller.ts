import { PrismaService } from "@config/prisma/prisma.service";
import { CurrentUser, Public } from "@decorator";
import { PAGE_MAX_OFFSET } from "@environments";
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { PaginationDto } from "@shared/pagination";
import { Conversation, ConversationMessage } from "@shared/types";
import { ChatService } from "./chat.service";
import { ConversationCreate } from "./types/conversation-create.dto";
import { ChatListGetDto } from "./types/getchatlist.dto";

@ApiBearerAuth()
@ApiTags("Conversation")
@Controller("conversation")
export class ChatController {
  constructor(private readonly chat: ChatService) {}

  @Get()
  @ApiOkResponse({
    description: "users chatlist",
    type: Conversation,
    isArray: true,
  })
  async getChatList(@CurrentUser() curr) {
    return this.chat.getConversations(curr.id);
  }

  @Get(":id")
  @ApiBearerAuth()
  @ApiOkResponse({
    description: "all chat in conversation ",
    type: ConversationMessage,
  })
  @ApiParam({
    name: "pagination options",
    type: PaginationDto,
  })
  async conversation(@Param() params: ChatListGetDto) {
    const cv = await this.chat.getMessages(params.id);
    return cv.messages;
  }

  @ApiBearerAuth()
  @ApiBody({
    description: "conversation Id",
    type: ConversationCreate,
  })
  @ApiOkResponse({
    type: Conversation,
  })
  @Post("join")
  async createConversation(
    @CurrentUser() curr,
    @Body("id", ParseIntPipe) id: number,
  ) {
    return this.chat.createConversation(curr.id, id);
  }
}
