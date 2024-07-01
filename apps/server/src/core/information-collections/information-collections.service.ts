import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { InformationCollection } from './entities/information-collection.entity'
import { CreateInformationCollectionDto } from './dto/create-information-collection.dto'
import { UpdateInformationCollectionDto } from './dto/update-information-collection.dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { parseFiltersToTypeOrm } from 'src/shared/filtering/parse-filters-to-type-orm'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-information-collections-by-param.dto'
import { Recopilation } from '../recopilations/entities/recopilation.entity'
import { Department } from '../users/entities/department.entity'
import { Category } from '../categories/entities/category.entity'

@Injectable()
export class InformationCollectionsService {
  constructor(
    @InjectRepository(InformationCollection)
    private informationCollectionsRepository: Repository<InformationCollection>,
    @InjectRepository(Recopilation)
    private recopilationRepository: Repository<Recopilation>,
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) {}

  async findAll({
    page,
    itemsPerPage,
    orderBy,
    orderType,
    filters
  }: PaginationParams &
    OrderByParamDto &
    OrderTypeParamDto &
    FiltersSegmentDto) {
    const [informationCollection, count] =
      await this.informationCollectionsRepository.findAndCount({
        take: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
        order: { [orderBy]: orderType },
        where: parseFiltersToTypeOrm(filters),
        relations: ['evidences', 'recopilation', 'department', 'category']
      })

    return { informationCollection, count }
  }

  async findOne(id: number): Promise<InformationCollection> {
    return await this.informationCollectionsRepository.findOneOrFail({
      where: { id },
      relations: ['evidences', 'recopilation', 'department', 'category']
    })
  }

  async getDepartmentAnswer(
    recopilationId: number,
    categoryId: number,
    departmentId: number,
    { orderBy, orderType }: OrderByParamDto & OrderTypeParamDto
  ) {
    const informationCollections = this.informationCollectionsRepository.find({
      relations: ['evidences'],
      where: {
        recopilation: { id: recopilationId },
        category: { id: categoryId },
        department: { id: departmentId }
      },
      order: {
        [orderBy]: orderType
      }
    })

    return informationCollections
  }

  async create(
    createInformationCollectionDto: CreateInformationCollectionDto
  ): Promise<InformationCollection> {
    const { recopilationId, categoryId, departmentId } =
      createInformationCollectionDto

    const [recopilation, category, department] = await Promise.all([
      this.recopilationRepository.findOneByOrFail({
        id: recopilationId
      }),
      this.categoryRepository.findOneByOrFail({ id: categoryId }),
      this.departmentRepository.findOneByOrFail({ id: departmentId })
    ])

    const informationCollection = this.informationCollectionsRepository.create({
      ...createInformationCollectionDto,
      recopilation,
      category,
      department
    })
    return await this.informationCollectionsRepository.save(
      informationCollection
    )
  }

  async update(
    id: number,
    updateInformationCollectionDto: UpdateInformationCollectionDto
  ): Promise<InformationCollection> {
    const { recopilationId, categoryId, departmentId } =
      updateInformationCollectionDto

    const [recopilation, category, department] = await Promise.all([
      this.recopilationRepository.findOneByOrFail({
        id: recopilationId
      }),
      this.categoryRepository.findOneByOrFail({ id: categoryId }),
      this.departmentRepository.findOneByOrFail({ id: departmentId })
    ])

    await this.informationCollectionsRepository.update(id, {
      name: updateInformationCollectionDto.name,
      summary: updateInformationCollectionDto.summary,
      recopilation,
      category,
      department
    })
    return this.informationCollectionsRepository.findOneByOrFail({ id })
  }

  async remove(id: number): Promise<void> {
    await this.informationCollectionsRepository.delete(id)
  }
}
