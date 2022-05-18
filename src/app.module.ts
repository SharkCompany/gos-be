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
import { DriveHistoryModule } from "@modules/drive-history/drive-history.module";
import { CloudinaryModule } from "@modules/cloudinary/cloudinary.module";
import { ChatGateway } from "@modules/chat/chat.gateway";
import { ChatModule } from "@modules/chat/chat.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    PassportModule,
    UserModule,
    AuthModule,
    DriveModule,
    DriveHistoryModule,
    CloudinaryModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    ChatGateway,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
