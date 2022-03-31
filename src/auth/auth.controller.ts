import { PrismaService } from "@config/prisma/prisma.service";
import {
  ConflictException,
  Controller,
  Get,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { User } from "@prisma/client";
import { AuthService } from "./auth.service";

import { FirebaseAuthGuard } from "./firebase/firebase-auth.guard";
import { CurrentUser, Public } from "@decorator";

@Controller()
export class AuthController {
  constructor(
    private auth: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Get(["login"])
  async loginUser(@CurrentUser() currentUser: User) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: currentUser.email,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    return this.auth.tradeToken(user);
  }

  @Get("login-refresh")
  async refreshToken(@CurrentUser() user: User) {
    return await this.auth.tradeToken(user);
  }

  @Public()
  @UseGuards(FirebaseAuthGuard)
  @Get("register")
  async register(@CurrentUser() curr: User) {
    let newUser;
    try {
      newUser = await this.prisma.user.create({
        data: {
          email: curr.email,
          name: curr.name,
        },
      });
    } catch (error) {
      throw new ConflictException("User already exist");
    }
    const tokens = await this.auth.tradeToken(newUser);
    return { tokens, info: newUser };
  }
}
