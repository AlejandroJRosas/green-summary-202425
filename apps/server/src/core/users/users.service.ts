import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.save(createUserDto)

    return user
  }

  async findAll() {
    const users = await this.usersRepository.find()

    return users
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneByOrFail({ id })

    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.update(id, updateUserDto)

    return user
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOneByOrFail({ id })

    await this.usersRepository.remove([user])

    return `User with id ${id} has been removed successfully`
  }
}
