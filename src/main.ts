import { FirebaseAuthGuard } from "@auth/firebase/firebase-auth.guard";
import { HttpExceptionFilter } from "@config/common/exception.filter";
import { PrismaService } from "@config/prisma/prisma.service";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";

declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({ origin: "http://localhost:3000", credentials: true });
  // app.useGlobalGuards(new FirebaseAuthGuard(new Reflector()));

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
