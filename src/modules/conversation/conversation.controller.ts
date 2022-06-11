import { CurrentUser } from "@decorator";
import { UserService } from "@modules/user/user.service";
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { Conversation } from "@shared/types";
import { ConversationService } from "./conversation.service";
import { JoinConversationDto } from "./types";

@ApiTags("Conversation")
@ApiBearerAuth()
@Controller("conversation")
export class ConversationController {
  constructor(
    private readonly _convService: ConversationService,
    private readonly _userService: UserService,
  ) {}

  @ApiOkResponse({
    description: "users chatlist",
    type: Conversation,
    isArray: true,
  })
  @Get()
  async getMyconversation(@CurrentUser() user) {
    return await this._convService.getConversation(user.id);
  }

  @ApiOkResponse({
    description: "get conversation detail",
    type: Conversation,
    isArray: true,
  })
  @Get(":id")
  async detail(@Param("id", ParseIntPipe) id: number) {
    return await this._convService.getConversationDetail(id);
  }

  @ApiOkResponse({
    type: Conversation,
  })
  @ApiParam({
    name: "id",
    description: "user id",
    type: JoinConversationDto,
  })
  @Post("join")
  async createConversation(@CurrentUser() curr, @Body("id") id: number) {
    console.log(id, curr.id);
    const user = await this._userService.findOne(id);
    if (!user) throw new ForbiddenException("Can't chat with not existed user");

    return this._convService.createConversation(curr.id, id);
  }
}
