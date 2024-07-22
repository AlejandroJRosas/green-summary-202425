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
import { LinksService } from './link.service'
import { CreateEvidenceDto } from './dto/create-evidence.dto'
import { UpdateEvidenceDto } from './dto/update-evidence.dto'
import { ApiTags } from '@nestjs/swagger'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-evidences-by-param.dto'
import { Roles } from '../auth/roles.decorator'
import { Role } from '../auth/role.enum'
import { InformationCollectionsService } from '../information-collections/information-collections.service'

@ApiTags('Links')
@Controller('links')
@Roles(Role.Coordinator, Role.Admin, Role.Department)
export class LinksController {
  constructor(
    private readonly linksService: LinksService,
    private readonly informationCollectionsService: InformationCollectionsService
  ) {}

  @Get()
  async findAll(
    @Query() { page = 1, itemsPerPage = 10 }: PaginationParams,
    @Query() { orderBy = 'id' }: OrderByParamDto,
    @Query() { orderType = 'ASC' }: OrderTypeParamDto,
    @Query() { filters = [] }: FiltersSegmentDto
  ) {
    const { links, count } = await this.linksService.findAll({
      page,
      itemsPerPage,
      orderBy,
      orderType,
      filters
    })

    const paginatedItems = constructPaginatedItemsDto(
      links,
      count,
      page,
      itemsPerPage
    )
    return paginatedItems
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const evidence = await this.linksService.findOne(+id)
    return evidence
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createEvidenceDto: CreateEvidenceDto) {
    const newEvidence = await this.linksService.create(createEvidenceDto)

    await this.informationCollectionsService.disapproveCollection(
      +createEvidenceDto.collectionId
    )

    return newEvidence
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEvidenceDto: UpdateEvidenceDto
  ) {
    const updatedEvidence = await this.linksService.update(
      +id,
      updateEvidenceDto
    )

    await this.informationCollectionsService.disapproveCollection(
      updatedEvidence.collection.id
    )

    return updatedEvidence
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.linksService.remove(+id)
  }
}
