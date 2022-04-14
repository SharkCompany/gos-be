import { PrismaService } from "@config/prisma/prisma.service";
import { JWT_SECRET } from "@environments";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { FirebaseAuthStrategy } from "./firebase/firebase-auth.strategy";
import { JwtStrategy } from "./jwt/jwt-auth.stragtegy";

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
    }),
  ],
  providers: [AuthService, FirebaseAuthStrategy, PrismaService, JwtStrategy],
})
export class AuthModule {}
