import { LoginResponse } from "@dto/login-response";
import { JWT_SECRET } from "@environments/index";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";

type TokenType =
  | "accessToken"
  | "refreshToken"
  | "emailToken"
  | "resetPassToken";

const common = {
  accessToken: {
    privateKey: JWT_SECRET,
    signOptions: {
      expiresIn: "1h", // 15m
    },
  },
  refreshToken: {
    privateKey: JWT_SECRET,
    signOptions: {
      expiresIn: "7d", // 7d
    },
  },
};

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService) {}
  googleLogin(user: any) {
    console.log("google login returned: ", user);
  }
  async generateToken(user: User, type: TokenType) {
    return await this.jwt.signAsync(
      { id: user.id },
      { expiresIn: common[type].signOptions.expiresIn },
    );
  }

  async tradeToken(user: User): Promise<LoginResponse> {
    const accessToken = await this.generateToken(user, "accessToken");
    const refreshToken = await this.generateToken(user, "refreshToken");
    return { accessToken, refreshToken };
  }