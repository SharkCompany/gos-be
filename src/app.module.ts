import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { ConfigModule } from "@nestjs/config";

import config from "./config/common/config";
import { PrismaService } from "@config/prisma/prisma.service";

import { APP_GUARD } from "@nestjs/core";

import { PassportModule } from "@nestjs/passport";
import { UserModule } from "@modules/user/user.module";
import { AuthModule } from "@modules/auth/auth.module";
import { JwtAuthGuard } from "@modules/auth/jwt/jwt-auth.guard";
import { DriveModule } from "@modules/drive/drive.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    PassportModule,
    UserModule,
    AuthModule,
    DriveModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
