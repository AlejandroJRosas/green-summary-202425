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

@ApiTags('Users')
@Controller('users')
@Roles(Role.Coordinator, Role.Admin)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() { id }: FindOneParams) {
    await this.usersService.remove(+id)
  }
}
