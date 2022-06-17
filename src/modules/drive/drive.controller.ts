import { CurrentUser, Public } from "@decorator";
import { ConversationService } from "@modules/conversation/conversation.service";
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiProperty,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";
import { DriveService } from "./drive.service";
import { CreateDriveDto } from "./dto/create-drive.dto";
import { GetDrivesDto } from "./dto/get-drives.dto";
import { MatchDriveDto } from "./dto/match-drive.dto";

@ApiTags("drive")
@Controller("drive")
export class DriveController {
  private readonly _logger = new Logger(DriveController.name);

  constructor(
    private readonly drive: DriveService,
    private readonly conversation: ConversationService,
  ) {}

  @ApiBearerAuth()
  @Get()
  async getDrives(@Query() query: GetDrivesDto) {
    console.log("geting drive");
    return await this.drive.getDrives(query);
  }

  @ApiBearerAuth()
  @ApiParam({
    name: "id",
  })
  @Get(":id")
  async findById(@Param("id", ParseIntPipe) id: number) {
    return await this.drive.findWithId(id);
  }

  @ApiBearerAuth()
  @ApiBody({ description: "Create drive payload", type: CreateDriveDto })
  @Post("create")
  async createDrive(@CurrentUser() curr, @Body() info: CreateDriveDto) {
    console.log("tao chuyen di", curr.id);
    return await this.drive.create(curr.id, info);
  }

  @ApiBearerAuth()
  @ApiParam({
    description: "Delete drive",
    name: "id",
  })
  @Delete(":id")
  async deleteDrive(@Param("id", ParseIntPipe) id: number) {
    return await this.drive.delete(id);
  }

  @ApiBearerAuth()
  @ApiBody({
    description: "Match drive",
    type: MatchDriveDto,
  })
  @Patch("match")
  async matchDrive(
    @CurrentUser() curr,
    @Body("id", ParseIntPipe) driveId: number,
  ) {
    try {
      const driveinfo = await this.drive.matchDrive(driveId, curr.id);
      const matcherId = driveinfo.drive.matcherId;
      const creatorId = driveinfo.drive.creatorId;
      this._logger.log(
        "creating conversation, userIds",
        matcherId + "," + creatorId,
      );
      const conversation = await this.conversation.createConversation(
        matcherId,
        creatorId,
      );
      this._logger.log("conversation created, id:" + conversation.id);

      return { conversationId: conversation.id };
    } catch (error) {
      this._logger.error(error);
    }
  }

  @Get("my")
  async getMyDrive(@CurrentUser() curr) {
    return await this.drive.getDrives({ creatorId: curr.id });
  }
}
