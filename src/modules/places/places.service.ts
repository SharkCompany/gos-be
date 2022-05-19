import { Injectable } from "@nestjs/common";
import { places } from "./places.data";

@Injectable()
export class PlacesService {
  findAll() {
    return places;
  }
  getRecomend() {
    return this.findAll();
  }
  findById(id: number) {
    return places.find((p) => p.id === id);
  }
}
