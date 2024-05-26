import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Query
} from '@nestjs/common'
import { RecopilationsService } from './recopilations.service'
import { CreateRecopilationDto } from './dto/create-recopilation.dto'
import { UpdateRecopilationDto } from './dto/update-recopilation.dto'
import { ApiTags } from '@nestjs/swagger'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'

@ApiTags('Recopilations')
@Controller('recopilations')
export class RecopilationsController {
  constructor(private readonly recopilationsService: RecopilationsService) {}

  @Get()
  async findAll(@Query() { page = 1, itemsPerPage = 10 }: PaginationParams) {
    const { recopilation, count } = await this.recopilationsService.findAll({
      page,
      itemsPerPage
    })

    const paginatedItems = constructPaginatedItemsDto(
      recopilation,
      count,
      page,
      itemsPerPage
    )
    return paginatedItems
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const recopilation = await this.recopilationsService.findOne(+id)

    return recopilation
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() recopilationData: CreateRecopilationDto) {
    const createdRecopilation =
      await this.recopilationsService.create(recopilationData)

    return createdRecopilation
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() recopilationData: UpdateRecopilationDto
  ) {
    const updatedRecopilation = await this.recopilationsService.update(
      +id,
      recopilationData
    )

    return updatedRecopilation
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.recopilationsService.remove(+id)
  }
}
