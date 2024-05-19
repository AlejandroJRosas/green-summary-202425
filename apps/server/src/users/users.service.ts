import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
/* import { UpdateUserDto } from './dto/update-user.dto' */
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto) {
    this.usersRepository.save(createUserDto)

    return { message: 'User created successfully' }
  }

  async findAll() {
    const users = await this.usersRepository.find()

    return { users }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`
  }

  /*   update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }
 */
  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
