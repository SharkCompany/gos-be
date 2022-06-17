import { Public } from "@decorator";
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { Place } from "@prisma/client";
import { CreatePlaceDto } from "./dto/create-place.dto";
import { places } from "./places.data";
import { PlacesService } from "./places.service";

@ApiTags("places")
@Controller("places")
export class PlacesController {
  constructor(private readonly place: PlacesService) {}

  @Public()
  @Get()
  async findAll() {
    console.log("geting place ");
    return await this.place.findAll();
  }

  @Public()
  @Get()
  recomnend() {
    return this.place.getRecomend();
  }

  @Public()
  @Get(":id")
  find(@Param("id", ParseIntPipe) id: number) {
    return this.place.findById(id);
  }

  @Public()
  @Post("create")
  async create(@Body() data: CreatePlaceDto) {
    // const placef: CreatePlaceDto[] = places.map((p) => ({
    //   title: p.title,
    //   address: p.address,
    //   longitude: p.geometry.longitude.toString(),
    //   latitude: p.geometry.latitude.toString(),
    // }));
    return await this.place.create(data);
  }
}
