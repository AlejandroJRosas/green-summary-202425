import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Query
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { FindOneParams } from './dto/find-one-params.dto'
import { ApiTags } from '@nestjs/swagger'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-users-by-param.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { Roles } from '../auth/roles.decorator'
import { Role } from '../auth/role.enum'
import { DepartmentPerRecopilation } from '../departments-per-recopilations/entities/departments-per-recopilation.entity'
import { Repository } from 'typeorm'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { MatrixChangedManyEvent } from '../recopilations/dto/matrix-changed-many.event'
import { InjectRepository } from '@nestjs/typeorm'

@ApiTags('Users')
@Controller('users')
@Roles(Role.Coordinator, Role.Admin)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(DepartmentPerRecopilation)
    private readonly departmentPerRecopilationRepository: Repository<DepartmentPerRecopilation>,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  async findAll(
    @Query() { page = 1, itemsPerPage = 10 }: PaginationParams,
    @Query() { orderBy = 'id' }: OrderByParamDto,
    @Query() { orderType = 'ASC' }: OrderTypeParamDto,
    @Query() { filters = [] }: FiltersSegmentDto
  ) {
    const { users, count } = await this.usersService.findAll({
      page,
      itemsPerPage,
      orderBy,
      orderType,
      filters
    })

    return constructPaginatedItemsDto(users, count, page, itemsPerPage)
  }

  @Get(':id')
  findOne(@Param() { id }: FindOneParams) {
    return this.usersService.findOne(+id)
  }

  @Patch(':id')
  async update(
    @Param() { id }: FindOneParams,
    @Body() updateUserDto: UpdateUserDto
  ) {
    const updatedUser = await this.usersService.update(+id, updateUserDto)

    const recopilations = await this.departmentPerRecopilationRepository.find({
      where: {
        department: {
          id: updatedUser.id
        }
      },
      relations: {
        recopilation: true
      }
    })

    this.eventEmitter.emit(
      'matrix.changed.many',
      new MatrixChangedManyEvent(recopilations.map((r) => r.recopilation.id))
    )

    return updatedUser
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() { id }: FindOneParams) {
    await this.usersService.remove(+id)
  }

  @Patch('password-change/:id')
  async passwordChange(@Param() { id }: FindOneParams) {
    return this.usersService.passwordChange(+id)
  }
}
