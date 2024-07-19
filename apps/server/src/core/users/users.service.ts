import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { Coordinator } from './entities/coordinator.entity'
import { Department } from './entities/department.entity'
import { Admin } from './entities/admin.entity'
import { USER_TYPES } from './users.constants'
import { User } from './entities/user.entity'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-users-by-param.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { parseFiltersToTypeOrm } from 'src/shared/filtering/parse-filters-to-type-orm'
import * as generator from 'generate-password'
import * as bcrypt from 'bcrypt'
import { MailsService } from '../mails/mails.service'
import { DepartmentPerRecopilation } from '../departments-per-recopilations/entities/departments-per-recopilation.entity'
import { MatrixChangedManyEvent } from '../recopilations/dto/matrix-changed-many.event'
import { EventEmitter2 } from '@nestjs/event-emitter'

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
    private departmentRepository: Repository<Department>,
    private mailsService: MailsService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { type, ...createUserDtoWithoutType } = createUserDto

    const generatedPassword = this.generatePassword()
    const passwordToUse = createUserDto.password || generatedPassword
    const encryptedPassword = await this.encryptPassword(passwordToUse)

    let user: User

    switch (type) {
      case USER_TYPES.ADMIN:
        user = await this.adminRepository.save({
          ...createUserDtoWithoutType,
          password: encryptedPassword
        })
        break
      case USER_TYPES.COORDINATOR:
        user = await this.coordinatorRepository.save({
          ...createUserDtoWithoutType,
          password: encryptedPassword
        })
        break
      case USER_TYPES.DEPARTMENT:
        user = await this.departmentRepository.save({
          ...createUserDtoWithoutType,
          password: encryptedPassword
        })
    }

    this.mailsService.sendMail(createUserDto.email, passwordToUse)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user

    if (passwordToUse === generatedPassword)
      return { ...userWithoutPassword, password: generatedPassword }

    return userWithoutPassword
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

    const updatedUser = await this.usersRepository.findOneByOrFail({ id })

    return updatedUser
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOneByOrFail({ id })

    if (user.type === 'department') {
      await this.usersRepository.softRemove(user)
    } else {
      await this.usersRepository.remove([user])
    }
  }

  async passwordChange(id: number) {
    const user = await this.usersRepository.findOneByOrFail({ id })
    const generatedPassword = this.generatePassword()
    const encryptedPassword = await this.encryptPassword(generatedPassword)
    user.password = encryptedPassword
    await this.usersRepository.update(id, user)

    this.mailsService.sendMail(user.email, generatedPassword)

    return generatedPassword
  }

  private async encryptPassword(pass: string) {
    return await bcrypt.hash(pass, 10)
  }

  private generatePassword() {
    return generator.generate({
      length: 12,
      numbers: true
    })
  }
}
