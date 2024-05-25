import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  HttpStatus,
  HttpCode,
  Query
} from '@nestjs/common'
import { Response } from 'express'
import { IndicatorsPerRecopilationsService } from './indicators_per_recopilations.service'
import { CreateIndicatorsPerRecopilationDto } from './dto/create-indicators_per_recopilation.dto'
import { UpdateIndicatorsPerRecopilationDto } from './dto/update-indicators_per_recopilation.dto'
import { ApiTags } from '@nestjs/swagger'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'

@ApiTags('Indicators_Per_Recopilations')
@Controller('indicators-per-recopilations')
export class IndicatorsPerRecopilationsController {
  constructor(
    private readonly indicatorsPerRecopilationsService: IndicatorsPerRecopilationsService
  ) {}

  @Get()
  async findAll(
    @Query() { page = 1, itemsPerPage = 10 }: PaginationParams,
    @Res() response: Response
  ) {
    const { indicatorsPerRecopilations, count } =
      await this.indicatorsPerRecopilationsService.findAll({
        page,
        itemsPerPage
      })

    const paginatedItems = constructPaginatedItemsDto(
      indicatorsPerRecopilations,
      count,
      page,
      itemsPerPage
    )
    return response.status(HttpStatus.OK).json(paginatedItems)
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response): Promise<void> {
    const indicatorsPerRecopilations =
      await this.indicatorsPerRecopilationsService.findOne(id)
    res.json(indicatorsPerRecopilations)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body()
    createIndicatorsPerRecopilationsDto: CreateIndicatorsPerRecopilationDto,
    @Res() res: Response
  ): Promise<void> {
    const newIndicatorsPerRecopilations =
      await this.indicatorsPerRecopilationsService.create(
        createIndicatorsPerRecopilationsDto
      )
    res.json(newIndicatorsPerRecopilations)
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body()
    updateIndicatorsPerRecopilationsDto: UpdateIndicatorsPerRecopilationDto,
    @Res() res: Response
  ): Promise<void> {
    const updatedIndicatorsPerRecopilations =
      await this.indicatorsPerRecopilationsService.update(
        id,
        updateIndicatorsPerRecopilationsDto
      )
    if (updatedIndicatorsPerRecopilations) {
      res.status(HttpStatus.OK).json(updatedIndicatorsPerRecopilations)
    } else {
      res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Indicators per recopilation not found' })
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number): Promise<void> {
    await this.indicatorsPerRecopilationsService.remove(id)
  }
}
