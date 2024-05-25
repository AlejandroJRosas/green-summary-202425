import {
  Controller,
  Post,
  Body,
  HttpCode,
  UnauthorizedException
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginAuthDto } from './dto/login-auth.dto'
import { ApiTags } from '@nestjs/swagger'
import { WrongPasswordException } from './errors/wrong-password.exception'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginAuthDto: LoginAuthDto) {
    try {
      const loginResult = await this.authService.login(loginAuthDto)
      return loginResult
    } catch (e) {
      if (e instanceof WrongPasswordException) {
        throw new UnauthorizedException('Contraseña inválida')
      } else {
        throw e
      }
    }
  }
}
