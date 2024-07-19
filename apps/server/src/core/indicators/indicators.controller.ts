import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  HttpStatus,
  Patch
} from '@nestjs/common'
import { IndicatorsService } from './indicators.service'
import { CreateIndicatorDto } from './dto/create-indicator.dto'
import { UpdateIndicatorDto } from './dto/update-indicator.dto'
import { ApiTags } from '@nestjs/swagger'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-indicators-by-param.dto'
import { Roles } from '../auth/roles.decorator'
import { Role } from '../auth/role.enum'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { IndicatorPerRecopilation } from '../indicators-per-recopilations/entities/indicator-per-recopilatio.entity'
import { Repository } from 'typeorm'
import { MatrixChangedManyEvent } from '../recopilations/dto/matrix-changed-many.event'
import { InjectRepository } from '@nestjs/typeorm'

@ApiTags('Indicators')
@Controller('indicators')
@Roles(Role.Coordinator, Role.Admin)
export class IndicatorsController {
  constructor(
    private readonly indicatorsService: IndicatorsService,
    @InjectRepository(IndicatorPerRecopilation)
    private readonly indicatorPerRecopilationRepository: Repository<IndicatorPerRecopilation>,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @Get()
  async getAllIndicators(
    @Query() { page = 1, itemsPerPage = 10 }: PaginationParams,
    @Query() { orderBy = 'index' }: OrderByParamDto,
    @Query() { orderType = 'ASC' }: OrderTypeParamDto,
    @Query() { filters = [] }: FiltersSegmentDto
  ) {
    const { indicators, count } = await this.indicatorsService.getAllIndicators(
      {
        page,
        itemsPerPage,
        orderBy,
        orderType,
        filters
      }
    )

    const paginatedItems = constructPaginatedItemsDto(
      indicators,
      count,
      page,
      itemsPerPage
    )
    return paginatedItems
  }

  @Get('/:id')
  async getIndicator(@Param('id') id: string) {
    const indicator = await this.indicatorsService.getOneIndicator(Number(id))
    return indicator
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createIndicator(@Body() newIndicador: CreateIndicatorDto) {
    const createdIndicator =
      await this.indicatorsService.createIndicator(newIndicador)
    return createdIndicator
  }

  @Patch('/:id')
  async updateIndicator(
    @Param('id') id: string,
    @Body() updatedIndicador: UpdateIndicatorDto
  ) {
    const updatedIndicator = await this.indicatorsService.updateIndicator(
      Number(id),
      updatedIndicador
    )

    const recopilations = await this.indicatorPerRecopilationRepository.find({
      where: {
        indicator: {
          index: updatedIndicador.index
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

    return updatedIndicator
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteIndicator(@Param('id') id: string) {
    await this.indicatorsService.deleteIndicator(Number(id))
  }

  @Get('/recopilation/:recopilationId')
  async getIndicatorsByRecopilation(
    @Param('recopilationId') recopilationId: string,
    @Query() { orderBy = 'index' }: OrderByParamDto,
    @Query() { orderType = 'ASC' }: OrderTypeParamDto
  ) {
    const indicators = this.indicatorsService.indicatorsByRecopilation(
      +recopilationId,
      { orderBy, orderType }
    )

    return indicators
  }
}
