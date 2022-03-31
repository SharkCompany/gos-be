import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "./environments";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
