import { CurrentUser, Public } from "@decorator";
import {
  Body,
  Controller,
  Delete,
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
  ApiParam,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { DriveService } from "./drive.service";
import { CreateDriveDto } from "./dto/create-drive.dto";
import { GetDrivesDto } from "./dto/get-drives.dto";
import { MatchDriveDto } from "./dto/match-drive.dto";

@ApiTags("drive")
@Controller("drive")
export class DriveController {
  constructor(private readonly drive: DriveService) {}

  @ApiBearerAuth()
  @Get()
  async getDrives(@Query() query: GetDrivesDto) {
    return await this.drive.getDrives(query);
  }

  @ApiBearerAuth()
  @ApiBody({ description: "Create drive payload", type: CreateDriveDto })
  @Post("create")
  async createDrive(@CurrentUser() curr, @Body() info: CreateDriveDto) {
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
    return await this.drive.matchDrive(driveId, curr.id);
  }

  @Get("my")
  async getMyDrive(@CurrentUser() curr) {
    return await this.drive.getDrives({ creatorId: curr.id });
  }
}
