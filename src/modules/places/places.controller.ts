import { Public } from "@decorator";
import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { PlacesService } from "./places.service";

@ApiTags("places")
@Controller("places")
export class PlacesController {
  constructor(private readonly place: PlacesService) {}

  @Public()
  @Get()
  findAll() {
    return this.place.findAll();
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
}
