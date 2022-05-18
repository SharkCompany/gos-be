import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { PrismaService } from "@config/prisma/prisma.service";
import { UserController } from "./user.controller";
import { CloudinaryModule } from "@modules/cloudinary/cloudinary.module";

@Module({
  imports: [CloudinaryModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
