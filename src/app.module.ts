import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
// import { DriveModule } from './drive/drive.module';
import GqlConfigService from "./config/graphql";
import { ConfigModule } from "@nestjs/config";
import { DriveModule } from "./drive/drive.module";
import { DriveDetailModule } from "./drive-detail/drive-detail.module";
import config from "./config/common/config";
import { PrismaService } from "@config/prisma/prisma.service";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    UserModule,
    DriveModule,
    DriveDetailModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
