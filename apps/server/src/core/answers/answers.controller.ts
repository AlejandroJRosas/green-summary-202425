import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch
} from '@nestjs/common'
import { AnswersService } from './answers.service'
import { CreateAnswerDto } from './dto/create-answer.dto'
import { UpdateAnswerDto } from './dto/update-answer.dto'
import { ApiTags } from '@nestjs/swagger'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-anwsers-by-param.dto'

@ApiTags('Answers')
@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Get()
  async findAll(
    @Query() { page = 1, itemsPerPage = 10 }: PaginationParams,
    @Query() { orderBy = 'id' }: OrderByParamDto,
    @Query() { orderType = 'ASC' }: OrderTypeParamDto,
    @Query() { filters = [] }: FiltersSegmentDto
  ) {
    const { answers, count } = await this.answersService.findAll({
      page,
      itemsPerPage,
      orderBy,
      orderType,
      filters
    })

    return constructPaginatedItemsDto(answers, count, page, itemsPerPage)
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.answersService.findOne(id)
  }

  @Post()
  async create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answersService.create(createAnswerDto)
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAnswerDto: UpdateAnswerDto
  ) {
    return this.answersService.update(id, updateAnswerDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.answersService.remove(id)
  }
}
