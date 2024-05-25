import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'

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

  async findAll({ page, itemsPerPage }: PaginationParams) {
    const [users, count] = await this.usersRepository.findAndCount({
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage
    })

    return { users, count }
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneByOrFail({ id })

    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.findOneByOrFail({ id })

    await this.usersRepository.update(id, updateUserDto)

    return this.usersRepository.findOneByOrFail({ id })
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOneByOrFail({ id })

    await this.usersRepository.remove([user])
  }
}
