import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet'
import { AppModule } from './app.module';
import {config} from 'dotenv'

config()

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options: SwaggerDocumentOptions =  {
    operationIdFactory: (
      controllerKey: string,
      methodKey: string
    ) => methodKey
  };
  
  const config = new DocumentBuilder()
    .setTitle('Widget-Demo-Backend-Service')
    .setDescription('This is the API for Kev\'s Demo App')
    .setVersion('1.0')
    .addTag('Widgets')
    .build();

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  app.use(helmet())
  app.enableCors()

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  const port = process.env.PORT
  await app.listen(port, ()=> {
    console.log('Server running')
  });
}
bootstrap();
