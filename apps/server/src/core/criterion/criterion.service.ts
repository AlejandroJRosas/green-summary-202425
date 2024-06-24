import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { CreateCriteriaDto } from './dto/create-criteria.dto'
import { UpdateCriteriaDto } from './dto/update-criteria.dto'
import { Criteria } from './entities/criteria.entity'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { parseFiltersToTypeOrm } from 'src/shared/filtering/parse-filters-to-type-orm'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-criteria-by-param.dto'
import { Indicator } from '../indicators/entities/indicator.entity'
import { CategorizedCriteria } from '../categorized-criteria/entities/categorized-criterion.entity'

@Injectable()
export class CriterionService {
  constructor(
    @InjectRepository(Criteria)
    private readonly criterionRepository: Repository<Criteria>,
    @InjectRepository(Indicator)
    private readonly indicatorRepository: Repository<Indicator>,
    @InjectRepository(CategorizedCriteria)
    private readonly categorizedCriteriaRepository: Repository<CategorizedCriteria>
  ) {}

  async createCriterion(
    createCriterionDto: CreateCriteriaDto
  ): Promise<Criteria> {
    try {
      const indicator = await this.indicatorRepository.findOneByOrFail({
        index: createCriterionDto.indicatorIndex
      })

      const criterion = this.criterionRepository.create({
        ...createCriterionDto,
        indicator
      })

      return await this.criterionRepository.save(criterion)
    } catch (error) {
      if (error.name === 'EntityNotFound') {
        throw new Error(
          `No se encontró el indicador con el índice ${createCriterionDto.indicatorIndex}`
        )
      } else {
        throw new Error('Error al crear el criterio.')
      }
    }
  }

  async getAllCriteria({
    page,
    itemsPerPage,
    orderBy,
    orderType,
    filters
  }: PaginationParams &
    OrderByParamDto &
    OrderTypeParamDto &
    FiltersSegmentDto) {
    const [criteria, count] = await this.criterionRepository.findAndCount({
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
      order: { [orderBy]: orderType },
      where: parseFiltersToTypeOrm(filters),
      relations: ['indicator']
    })

    return { criteria, count }
  }

  async getOneCriterion(id: number): Promise<Criteria> {
    try {
      const criterion = await this.criterionRepository.findOneOrFail({
        where: { id },
        relations: ['indicator']
      })
      return criterion
    } catch (error) {
      throw new Error(`No se encontró el criterio con ID ${id}.`)
    }
  }

  async updateCriterion(
    id: number,
    updateCriteriaDto: UpdateCriteriaDto
  ): Promise<Criteria> {
    try {
      const { indicatorIndex, ...dtoWithoutIndicatorIndex } = updateCriteriaDto

      const indicator = await this.indicatorRepository.findOneByOrFail({
        index: indicatorIndex
      })

      const updatedCriteria = this.criterionRepository.create({
        ...dtoWithoutIndicatorIndex,
        indicator
      })

      await this.criterionRepository.update({ id }, updatedCriteria)

      return await this.criterionRepository.findOneByOrFail({ id })
    } catch (error) {
      if (error.name === 'EntityNotFound') {
        throw new Error(
          `No se encontró el indicador con el índice ${updateCriteriaDto.indicatorIndex}`
        )
      } else {
        throw new Error(`Error al actualizar el criterio con ID ${id}.`)
      }
    }
  }

  async deleteCriterion(id: number): Promise<void> {
    try {
      await this.criterionRepository.findOneByOrFail({ id })

      await this.criterionRepository.delete({ id })
    } catch (error) {
      if (error.name === 'EntityNotFound') {
        throw new Error(`No se encontró el criterio con ID ${id}.`)
      } else {
        throw new Error(`Error al eliminar el criterio con ID ${id}.`)
      }
    }
  }

  async criterionByIndicator(
    indicatorId: number,
    { orderBy, orderType }: OrderByParamDto & OrderTypeParamDto
  ): Promise<Criteria[]> {
    try {
      const indicator = await this.indicatorRepository.findOneByOrFail({
        index: indicatorId
      })

      const criteria = await this.criterionRepository.find({
        where: { indicator: indicator },
        order: { [orderBy]: orderType }
      })

      return criteria
    } catch (error) {
      if (error.name === 'EntityNotFound') {
        throw new Error(
          `No se encontró el indicador con el índice ${indicatorId}.`
        )
      } else {
        throw new Error(`Error al obtener criterios por indicador.`)
      }
    }
  }

  async criterionByRecopilation(
    recopilationId: number,
    { orderBy, orderType }: OrderByParamDto & OrderTypeParamDto
  ): Promise<Criteria[]> {
    try {
      const categorizedCriterias =
        await this.categorizedCriteriaRepository.find({
          where: { recopilation: { id: recopilationId } },
          relations: ['criteria']
        })

      const criteria = await this.criterionRepository.find({
        where: {
          id: In(categorizedCriterias.map((c) => c.criteria.id))
        },
        order: { [orderBy]: orderType }
      })

      return criteria
    } catch (error) {
      if (error.name === 'EntityNotFound') {
        throw new Error(
          `No se encontraron criterios para la recopilación con ID ${recopilationId}.`
        )
      } else {
        throw new Error(`Error al obtener criterios por recopilación.`)
      }
    }
  }
}
