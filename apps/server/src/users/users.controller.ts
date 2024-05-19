import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { FindOneParams } from './dto/find-one-params.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
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
  async remove(@Param() { id }: FindOneParams) {
    return this.usersService.remove(+id)
  }
}
