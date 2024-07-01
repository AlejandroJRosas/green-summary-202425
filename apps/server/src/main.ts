import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'
import { TypeORMExceptionFilter } from './errors/type-orm-exception.filter'
import { HttpExceptionFilter } from './errors/http-exception.filter'
import { SuccessfulResponseBuilderInterceptor } from './succesful-response-builder/successful-response-builder'
import { ClassValidatorValidationsException } from './errors/class-validator-validations.exception'
import { ClassValidatorValidationsExceptionFilter } from './errors/class-validator-validations-exception.filter'
import * as express from 'express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')))

  app.enableCors()

  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new TypeORMExceptionFilter(),
    new ClassValidatorValidationsExceptionFilter()
  )

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        return new ClassValidatorValidationsException(errors)
      }
    })
  )

  app.useGlobalInterceptors(new SuccessfulResponseBuilderInterceptor())

  const config = new DocumentBuilder()
    .setTitle('Green Summary Backend')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  await app.listen(3000)
}
bootstrap()
