import { PrismaService } from "@config/prisma/prisma.service";
import { Controller, Get, HttpStatus, UseGuards } from "@nestjs/common";
import { User } from "@prisma/client";
import { AuthService } from "./auth.service";

import { FirebaseAuthGuard } from "./firebase/firebase-auth.guard";
import { CurrentUser, Public } from "@decorator";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { LoginResponse } from "@dto/login-response";

@ApiTags("auth")
@Controller()
export class AuthController {
  constructor(
    private auth: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  @ApiOkResponse({
    status: HttpStatus.OK,
    type: LoginResponse,
    description: "Login success",
  })
  @ApiBearerAuth()
  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Get("login")
  async loginUser(@CurrentUser() curr) {
    const { email, picture, name } = curr;

    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      const newUser = await this.auth.registerUser({ name, email, picture });
      const tokens = await this.auth.tradeToken(newUser);
      return { tokens, info: newUser };
    }
    return { tokens: await this.auth.tradeToken(user), info: user };
  }

  @ApiOkResponse({
    status: HttpStatus.OK,
    type: LoginResponse,
    description: "Login success",
  })
  @ApiBearerAuth()
  @Get("login-refresh")
  async refreshToken(@CurrentUser() user: User) {
    return await this.auth.tradeToken(user);
  }

  @Public()
  @Get("gentoken")
  async gentoken() {
    return await this.auth.tradeToken({ id: 3 });
  }
}
