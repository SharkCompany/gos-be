import { CurrentUser, Public } from "@decorator";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
import { DriveStatus } from "@prisma/client";
import { DriveService } from "./drive.service";
import { CreateDriveDto } from "./dto/create-drive.dto";

@ApiTags("drive")
@Controller("drive")
export class DriveController {
  constructor(private readonly drive: DriveService) {}

  @Public()
  @ApiBearerAuth()
  @ApiParam({
    name: "status",
    enum: DriveStatus,
  })
  @Get()
  async driveWithStatus(@Query("status") status: DriveStatus) {
    return await this.drive.getDrives(status);
  }

  @ApiBearerAuth()
  @ApiBody({ description: "Create drive payload", type: CreateDriveDto })
  @Public()
  @Post("create")
  async createDrive(@CurrentUser() curr, @Body() info: CreateDriveDto) {
    return await this.drive.create({ driverId: curr.id, ...info });
  }

  @ApiBearerAuth()
  @ApiParam({
    description: "Delete drive",
    name: "id",
  })
  @Public()
  @Delete(":id")
  async deleteDrive(@Param("id", ParseIntPipe) id: number) {
    return await this.drive.delete(id);
  }
}
