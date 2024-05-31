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
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { parseFiltersToTypeOrm } from 'src/shared/filtering/parse-filters-to-type-orm'
import * as generator from 'generate-password'
import * as bcrypt from 'bcrypt'

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
    const { type, ...createUserDtoWithoutType } = createUserDto
    let generatedPassword = ''
    let user: User

    switch (type) {
      case USER_TYPES.ADMIN:
        return await this.adminRepository.save({
          ...createUserDtoWithoutType,
          password: await this.encryptPassword(createUserDto.password)
        })
      case USER_TYPES.COORDINATOR:
        return await this.coordinatorRepository.save({
          ...createUserDtoWithoutType,
          password: await this.encryptPassword(createUserDto.password)
        })
      case USER_TYPES.DEPARTMENT:
        generatedPassword = generator.generate({
          length: 12,
          numbers: true
        })
        createUserDtoWithoutType.password =
          await this.encryptPassword(generatedPassword)
        user = await this.departmentRepository.save(createUserDtoWithoutType)

        return { ...user, password: user.password }
    }
  }

  async findAll({
    page,
    itemsPerPage,
    orderBy,
    orderType,
    filters
  }: PaginationParams &
    OrderByParamDto &
    OrderTypeParamDto &
    FiltersSegmentDto) {
    const [users, count] = await this.usersRepository.findAndCount({
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
      order: { [orderBy]: orderType },
      where: parseFiltersToTypeOrm(filters)
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

  private encryptPassword(pass: string) {
    return bcrypt.hash(pass, 10)
  }
}
