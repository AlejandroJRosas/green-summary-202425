import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
  Patch,
  Put
} from '@nestjs/common'
import { RecopilationsService } from './recopilations.service'
import { CreateRecopilationDto } from './dto/create-recopilation.dto'
import { UpdateRecopilationDto } from './dto/update-recopilation.dto'
import { ApiTags } from '@nestjs/swagger'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-recopilations-by-param.dto'
import { RelateIndicatorsToRecopilationDto } from './dto/relate-indicators-to-recopilation.dto'
import { RecommendCategoriesDto } from './dto/recommend-categories.dto'
import { Roles } from '../auth/roles.decorator'
import { Role } from '../auth/role.enum'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Recopilation } from './entities/recopilation.entity'

@ApiTags('Recopilations')
@Controller('recopilations')
export class RecopilationsController {
  constructor(
    private readonly recopilationsService: RecopilationsService,
    @InjectRepository(Recopilation)
    private readonly recopilationsRepository: Repository<Recopilation>
  ) {}

  @Roles(Role.Coordinator, Role.Admin, Role.Department)
  @Get()
  async findAll(
    @Query() { page = 1, itemsPerPage = 10 }: PaginationParams,
    @Query() { orderBy = 'id' }: OrderByParamDto,
    @Query() { orderType = 'ASC' }: OrderTypeParamDto,
    @Query() { filters = [] }: FiltersSegmentDto
  ) {
    const { recopilation, count } = await this.recopilationsService.findAll({
      page,
      itemsPerPage,
      orderBy,
      orderType,
      filters
    })

    const paginatedItems = constructPaginatedItemsDto(
      recopilation,
      count,
      page,
      itemsPerPage
    )
    return paginatedItems
  }

  @Roles(Role.Coordinator, Role.Admin, Role.Department)
  @Get('active')
  async findActive(
    @Query() { orderBy = 'id' }: OrderByParamDto,
    @Query() { orderType = 'ASC' }: OrderTypeParamDto
  ) {
    const activeRecopilations =
      await this.recopilationsService.getActiveRecopilations({
        orderBy,
        orderType
      })

    return activeRecopilations
  }

  @Roles(Role.Coordinator, Role.Admin, Role.Department)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const recopilation = await this.recopilationsService.findOne(+id)

    return recopilation
  }

  @Roles(Role.Coordinator, Role.Admin, Role.Department)
  @Get(':id/detailed')
  async findOneDetailed(@Param('id') id: string) {
    const recopilation = await this.recopilationsService.findOneDetailed(+id)

    return recopilation
  }

  @Roles(Role.Coordinator, Role.Admin, Role.Department)
  @Get(':id/matrix')
  async findOneMatrix(@Param('id') id: string) {
    const recopilation = await this.recopilationsService.findOneMatrix(+id)

    return recopilation
  }

  @Roles(Role.Coordinator, Role.Admin)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() recopilationData: CreateRecopilationDto) {
    const createdRecopilation =
      await this.recopilationsService.create(recopilationData)

    return createdRecopilation
  }

  @Roles(Role.Coordinator, Role.Admin)
  @Patch(':id')
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

  @Roles(Role.Coordinator, Role.Admin)
  @Put()
  async updateOrCreate(@Body() recopilationData: UpdateRecopilationDto) {
    if (!recopilationData.id) {
      return await this.recopilationsService.create(
        recopilationData as CreateRecopilationDto
      )
    }

    const updatedRecopilation = await this.recopilationsService.update(
      recopilationData.id,
      recopilationData
    )

    return updatedRecopilation
  }

  @Roles(Role.Coordinator, Role.Admin)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.recopilationsService.remove(+id)
  }

  @Roles(Role.Coordinator, Role.Admin)
  @Put('relate-indicators')
  async relateIndicatorsToRecopilation(
    @Body() relateIndicatorsToRecopilationDto: RelateIndicatorsToRecopilationDto
  ) {
    try {
      return await this.recopilationsService.relateToIndicators(
        relateIndicatorsToRecopilationDto
      )
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  @Roles(Role.Coordinator, Role.Admin)
  @Put('recommend-categories')
  async recommendCategoriesToDepartments(
    @Body() recommendCategoriesDto: RecommendCategoriesDto
  ) {
    try {
      return await this.recopilationsService.recommendCategories(
        recommendCategoriesDto
      )
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  @Roles(Role.Coordinator, Role.Admin)
  @Patch(':id/set-as-ready')
  async setAsReady(@Param('id') id: string) {
    const recopilation = await this.recopilationsRepository.findOneByOrFail({
      id: +id
    })

    recopilation.isReady = true

    await this.recopilationsRepository.save(recopilation)
  }
}
