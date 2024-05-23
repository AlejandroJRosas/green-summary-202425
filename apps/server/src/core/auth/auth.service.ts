import { HttpException, Injectable } from '@nestjs/common'
import { LoginAuthDto } from './dto/login-auth.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../users/entities/user.entity'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto
    const user = await this.usersRepository.findOneByOrFail({ email })

    if (password !== user.password)
      throw new HttpException('CLAVE INVALIDA', 403)

    const payload = { id: user.id, name: user.fullName, type: user.type }
    const token = await this.jwtService.sign(payload)
    const data = {
      user: user,
      token
    }
    return data
  }
}
