import {
  Controller,
  Post,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
  Res
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginAuthDto } from './dto/login-auth.dto'
import { ApiTags } from '@nestjs/swagger'
import { Response } from 'express'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async login(@Body() loginAuthDto: LoginAuthDto, @Res() response: Response) {
    const logued = await this.authService.login(loginAuthDto)
    return response.json(logued)
  }
}
