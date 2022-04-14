import { PrismaService } from "@config/prisma/prisma.service";
import { LoginResponse } from "@dto/login-response";
import { JWT_SECRET } from "@environments";
import { ConflictException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { JwtPayload } from "./jwt/jwt-auth.stragtegy";

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
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async generateToken(user: JwtPayload, type: TokenType) {
    return await this.jwt.signAsync(
      { id: user.id },
      { expiresIn: common[type].signOptions.expiresIn },
    );
  }

  async tradeToken(user: JwtPayload): Promise<LoginResponse> {
    const accessToken = await this.generateToken(user, "accessToken");
    const refreshToken = await this.generateToken(user, "refreshToken");
    return { accessToken, refreshToken };
  }

  async registerUser(info) {
    let newUser;
    try {
      newUser = await this.prisma.user.create({
        data: { ...info },
      });
    } catch (error) {
      throw new ConflictException("User already exist");
    }
    return newUser;
  }
}
