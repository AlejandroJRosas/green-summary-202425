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
    try {
      return await this.informationCollectionsRepository.findOneByOrFail({ id })
    } catch (error) {
      throw new Error(
        `No se encontró la colección de información con ID ${id}.`
      )
    }
  }

  async create(
    createInformationCollectionDto: CreateInformationCollectionDto
  ): Promise<InformationCollection> {
    const { recopilationId, categoryId, departmentId } =
      createInformationCollectionDto

    const [recopilation, category, department] = await Promise.all([
      this.recopilationRepository
        .findOneByOrFail({ id: recopilationId })
        .catch(() => {
          throw new Error(
            `No se encontró la recopilación con ID ${recopilationId}.`
          )
        }),
      this.categoryRepository.findOneByOrFail({ id: categoryId }).catch(() => {
        throw new Error(`No se encontró la categoría con ID ${categoryId}.`)
      }),
      this.departmentRepository
        .findOneByOrFail({ id: departmentId })
        .catch(() => {
          throw new Error(
            `No se encontró el departamento con ID ${departmentId}.`
          )
        })
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
      this.recopilationRepository
        .findOneByOrFail({ id: recopilationId })
        .catch(() => {
          throw new Error(
            `No se encontró la recopilación con ID ${recopilationId}.`
          )
        }),
      this.categoryRepository.findOneByOrFail({ id: categoryId }).catch(() => {
        throw new Error(`No se encontró la categoría con ID ${categoryId}.`)
      }),
      this.departmentRepository
        .findOneByOrFail({ id: departmentId })
        .catch(() => {
          throw new Error(
            `No se encontró el departamento con ID ${departmentId}.`
          )
        })
    ])

    await this.informationCollectionsRepository
      .update(id, {
        ...updateInformationCollectionDto,
        recopilation,
        category,
        department
      })
      .catch(() => {
        throw new Error(
          `Error al actualizar la colección de información con ID ${id}.`
        )
      })

    return this.informationCollectionsRepository
      .findOneByOrFail({ id })
      .catch(() => {
        throw new Error(
          `No se encontró la colección de información con ID ${id} después de la actualización.`
        )
      })
  }

  async remove(id: number): Promise<void> {
    try {
      await this.informationCollectionsRepository.findOneByOrFail({ id })
      await this.informationCollectionsRepository.delete(id)
    } catch (error) {
      throw new Error(
        `Error al eliminar la colección de información con ID ${id}.`
      )
    }
  }
}
