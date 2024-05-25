import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { TypeORMExceptionFilter } from './errors/type-orm-exception.filter'
import { HttpExceptionFilter } from './errors/http-exception.filter'
import { SuccessfulResponseBuilderInterceptor } from './succesful-response-builder/successful-response-builder'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalFilters(new HttpExceptionFilter(), new TypeORMExceptionFilter())

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )

  app.useGlobalInterceptors(new SuccessfulResponseBuilderInterceptor())

  const config = new DocumentBuilder()
    .setTitle('Green Summary Backend')
    .setDescription('The API description')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(3000)
}
bootstrap()
