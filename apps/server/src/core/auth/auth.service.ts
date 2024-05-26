import { Injectable } from '@nestjs/common'
import { LoginAuthDto } from './dto/login-auth.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../users/entities/user.entity'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import { WrongPasswordException } from './errors/wrong-password.exception'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.usersRepository.findOneByOrFail({
      email: loginAuthDto.email
    })

    if (loginAuthDto.password !== user.password)
      throw new WrongPasswordException()

    const payload = { id: user.id, name: user.fullName, type: user.type }
    const token = this.jwtService.sign(payload)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user

    const data = {
      user: userWithoutPassword,
      token
    }
    return data
  }
}
