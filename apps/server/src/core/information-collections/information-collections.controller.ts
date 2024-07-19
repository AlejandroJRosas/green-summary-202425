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
  Req
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
import { Roles } from '../auth/roles.decorator'
import { Role } from '../auth/role.enum'
import { EventEmitter2 } from '@nestjs/event-emitter'
import { MatrixChangedEvent } from '../recopilations/dto/matrix-changed.event'

@ApiTags('Information Collections')
@Controller('information-collections')
@Roles(Role.Coordinator, Role.Admin, Role.Department)
export class InformationCollectionsController {
  constructor(
    private readonly informationCollectionsService: InformationCollectionsService,
    private readonly eventEmitter: EventEmitter2
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

  @Get('department-answer/:recopilationId/:categoryId')
  async getAllDepartmentsAnswers(
    @Param('recopilationId') recopilationId: number,
    @Param('categoryId') categoryId: number,
    @Query() { orderBy = 'id' }: OrderByParamDto,
    @Query() { orderType = 'ASC' }: OrderTypeParamDto
  ) {
    return this.informationCollectionsService.getAllDepartmentsAnswers(
      recopilationId,
      categoryId,
      { orderBy, orderType }
    )
  }

  @Get('department-answer/:recopilationId/:categoryId/:departmentId')
  async getDepartmentAnswer(
    @Param('recopilationId') recopilationId: number,
    @Param('categoryId') categoryId: number,
    @Param('departmentId') departmentId: number,
    @Query() { orderBy = 'id' }: OrderByParamDto,
    @Query() { orderType = 'ASC' }: OrderTypeParamDto
  ) {
    return this.informationCollectionsService.getDepartmentAnswer(
      recopilationId,
      categoryId,
      departmentId,
      { orderBy, orderType }
    )
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createInformationCollectionDto: CreateInformationCollectionDto
  ) {
    const newCollection = await this.informationCollectionsService.create(
      createInformationCollectionDto
    )

    this.eventEmitter.emit(
      'matrix.changed',
      new MatrixChangedEvent(
        Number(createInformationCollectionDto.recopilationId)
      )
    )

    return newCollection
  }

  @Patch(':id')
  async update(
    @Req() request: Request,
    @Param('id') id: number,
    @Body() updateInformationCollectionDto: UpdateInformationCollectionDto
  ) {
    const notifyCoordinators = request['user'].type === Role.Department

    const updatedCollection = await this.informationCollectionsService.update(
      id,
      updateInformationCollectionDto,
      notifyCoordinators
    )

    this.eventEmitter.emit(
      'matrix.changed',
      new MatrixChangedEvent(Number(updatedCollection.recopilation.id))
    )

    return updatedCollection
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number) {
    const collectionToRemove =
      await this.informationCollectionsService.findOne(id)

    await this.informationCollectionsService.remove(id)

    this.eventEmitter.emit(
      'matrix.changed',
      new MatrixChangedEvent(Number(collectionToRemove.recopilation.id))
    )
  }
}
