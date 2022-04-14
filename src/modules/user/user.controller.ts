import { CurrentUser, Public } from "@decorator";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserInfoDto } from "./dto/updateUserInfoDto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("user")
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("me")
  async me(@CurrentUser() user) {
    return this.userService.findMe(user.email);
  }

  @Public()
  @Get("all")
  async allUser() {
    const users = await this.userService.findAll();
    return users;
  }

  @Post("update")
  async updateInfo(@CurrentUser() curr, @Body() params: UpdateUserInfoDto) {
    const diff = await this.userService.updateInfo(curr.id, params);
    return diff;
  }
}
