import { FirebaseAuthGuard } from "src/modules/auth/firebase/firebase-auth.guard";
import { HttpExceptionFilter } from "@config/common/exception.filter";
import { PrismaService } from "@config/prisma/prisma.service";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from "@nestjs/swagger";

declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({ origin: ["http://localhost:3000", "*"], credentials: true });
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const config = new DocumentBuilder()
    .setTitle("Go SinhVien APIs example")
    .setDescription("The SwipeUp API description")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const cusomConfig: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: "My API Docs",
  };
  SwaggerModule.setup("api", app, document, cusomConfig);

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
