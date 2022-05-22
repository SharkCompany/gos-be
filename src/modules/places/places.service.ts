import { PrismaService } from "@config/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Place } from "@prisma/client";
import { CreatePlaceDto } from "./dto/create-place.dto";

@Injectable()
export class PlacesService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    return this.prisma.place.findMany();
  }
  getRecomend() {
    return this.findAll();
  }
  findById(id: number) {
    return this.prisma.place.findUnique({
      where: { id },
    });
  }
  async create(place: CreatePlaceDto) {
    return this.prisma.place.create({
      data: { ...place },
    });
  }
}
