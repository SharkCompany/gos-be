import { PrismaService } from "@config/prisma/prisma.service";
import { Module } from "@nestjs/common";
import { InformationService } from "./information.service";

@Module({
  providers: [InformationService, PrismaService],
  exports: [InformationService],
})
export class InformationModule {}
