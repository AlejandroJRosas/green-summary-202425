import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query
} from '@nestjs/common'
import { IndicatorsPerRecopilationsService } from './indicators-per-recopilations.service'
import { CreateIndicatorPerRecopilationDto } from './dto/create-indicator-per-recopilation.dto'
import { UpdateIndicatorPerRecopilationDto } from './dto/update-indicator-per-recopilation.dto'
import { ApiTags } from '@nestjs/swagger'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'

@ApiTags('Indicators Per Recopilations')
@Controller('indicators-per-recopilations')
export class IndicatorsPerRecopilationsController {
  constructor(
    private readonly indicatorsPerRecopilationsService: IndicatorsPerRecopilationsService
  ) {}

  @Get()
  async findAll(@Query() { page = 1, itemsPerPage = 10 }: PaginationParams) {
    const { indicatorsPerRecopilations, count } =
      await this.indicatorsPerRecopilationsService.findAll({
        page,
        itemsPerPage
      })

    return constructPaginatedItemsDto(
      indicatorsPerRecopilations,
      count,
      page,
      itemsPerPage
    )
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.indicatorsPerRecopilationsService.findOne(id)
  }

  @Post()
  async create(
    @Body()
    createIndicatorsPerRecopilationsDto: CreateIndicatorPerRecopilationDto
  ) {
    return this.indicatorsPerRecopilationsService.create(
      createIndicatorsPerRecopilationsDto
    )
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body()
    updateIndicatorsPerRecopilationsDto: UpdateIndicatorPerRecopilationDto
  ) {
    return this.indicatorsPerRecopilationsService.update(
      id,
      updateIndicatorsPerRecopilationsDto
    )
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.indicatorsPerRecopilationsService.remove(id)
  }
}
