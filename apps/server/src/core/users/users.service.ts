import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { Coordinator } from './entities/coordinator.entity'
import { Department } from './entities/department.entity'
import { Admin } from './entities/admin.entity'
import { USER_TYPES } from './constants'
import { User } from './entities/user.entity'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-by-param.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(Coordinator)
    private coordinatorRepository: Repository<Coordinator>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { type, ...userData } = createUserDto

      switch (type) {
        case USER_TYPES.ADMIN:
          return await this.adminRepository.save(userData)
        case USER_TYPES.COORDINATOR:
          return await this.coordinatorRepository.save(userData)
        case USER_TYPES.DEPARTMENT:
          return await this.departmentRepository.save(userData)
      }
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  async findAll({
    page,
    itemsPerPage,
    orderBy,
    orderType
  }: PaginationParams & OrderByParamDto & OrderTypeParamDto) {
    const [users, count] = await this.usersRepository.findAndCount({
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
      order: { [orderBy]: orderType }
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
