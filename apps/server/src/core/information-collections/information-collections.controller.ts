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
  Patch
} from '@nestjs/common'
import { InformationCollectionsService } from './information-collections.service'
import { CreateInformationCollectionDto } from './dto/create-information-collection.dto'
import { UpdateInformationCollectionDto } from './dto/update-information-collection.dto'
import { ApiTags } from '@nestjs/swagger'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-information-collections-by-param.dto'

@ApiTags('Information Collections')
@Controller('information-collections')
export class InformationCollectionsController {
  constructor(
    private readonly informationCollectionsService: InformationCollectionsService
  ) {}

  @Get()
  async findAll(
    @Query() { page = 1, itemsPerPage = 10 }: PaginationParams,
    @Query() { orderBy = 'id' }: OrderByParamDto,
    @Query() { orderType = 'ASC' }: OrderTypeParamDto,
    @Query() { filters = [] }: FiltersSegmentDto
  ) {
    const { informationCollection, count } =
      await this.informationCollectionsService.findAll({
        page,
        itemsPerPage,
        orderBy,
        orderType,
        filters
      })

    const paginatedItems = constructPaginatedItemsDto(
      informationCollection,
      count,
      page,
      itemsPerPage
    )
    return paginatedItems
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const collection = await this.informationCollectionsService.findOne(id)

    return collection
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createInformationCollectionDto: CreateInformationCollectionDto
  ) {
    const newCollection = await this.informationCollectionsService.create(
      createInformationCollectionDto
    )
    return newCollection
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateInformationCollectionDto: UpdateInformationCollectionDto
  ) {
    const updatedCollection = await this.informationCollectionsService.update(
      id,
      updateInformationCollectionDto
    )

    return updatedCollection
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number) {
    await this.informationCollectionsService.remove(id)
  }
}
