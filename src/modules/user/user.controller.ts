import { CurrentUser, Public } from "@decorator";
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserInfoDto } from "./dto/updateUserInfoDto";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CloudinaryService } from "@modules/cloudinary/cloudinary.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileUploadDto } from "./dto/fileUploadDto";
@ApiTags("user")
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly upload: CloudinaryService,
  ) {}

  @ApiBearerAuth()
  @Get("me")
  async me(@CurrentUser() user) {
    return await this.userService.findMe(user.id);
  }

  @Public()
  @Get("all")
  async allUser() {
    const users = await this.userService.findAll();
    return users;
  }

  @ApiBearerAuth()
  @ApiOkResponse({ status: HttpStatus.OK, description: "User info" })
  @Post("information")
  async updateInfo(@CurrentUser() curr, @Body() params: UpdateUserInfoDto) {
    const diff = await this.userService.updateInfo(curr.id, params);
    return diff;
  }

  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "image upload",
    type: FileUploadDto,
  })
  @ApiBearerAuth()
  @Post("add-image")
  @Public()
  @UseInterceptors(FileInterceptor("file"))
  async uploadImage(
    @CurrentUser() curr,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const picture = await this.upload.uploadImage(file);
    return await this.userService.updateImage(curr.id, picture.secure_url);
  }
}
