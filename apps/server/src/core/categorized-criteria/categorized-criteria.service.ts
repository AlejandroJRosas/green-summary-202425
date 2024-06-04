import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CategorizedCriteria } from './entities/categorized-criterion.entity'
import { CreateCategorizedCriteriaDto } from './dto/create-categorized-criterion.dto'
import { UpdateCategorizedCriterionDto } from './dto/update-categorized-criterion.dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { Recopilation } from '../recopilations/entities/recopilation.entity'
import { Criteria } from '../criterion/entities/criteria.entity'
import { Category } from '../categories/entities/category.entity'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { parseFiltersToTypeOrm } from 'src/shared/filtering/parse-filters-to-type-orm'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-categorized-criteria-by-param.dto'

@Injectable()
export class CategorizedCriteriaService {
  constructor(
    @InjectRepository(CategorizedCriteria)
    private readonly categorizedCriteriaRepository: Repository<CategorizedCriteria>,
    @InjectRepository(Recopilation)
    private readonly recopilationRepository: Repository<Recopilation>,
    @InjectRepository(Criteria)
    private readonly criterionRepository: Repository<Criteria>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
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
    const [categorizedCriteria, count] =
      await this.categorizedCriteriaRepository.findAndCount({
        take: Number(itemsPerPage),
        skip: (Number(page) - 1) * Number(itemsPerPage),
        relations: ['recopilation', 'criterion', 'category'],
        order: { [orderBy]: orderType },
        where: parseFiltersToTypeOrm(filters)
      })

    return { categorizedCriteria, count }
  }

  async findOne(id: number): Promise<CategorizedCriteria> {
    return this.categorizedCriteriaRepository.findOneOrFail({
      where: { id },
      relations: ['recopilation', 'criterion', 'category']
    })
  }

  async create(
    createCategorizedCriteriaDto: CreateCategorizedCriteriaDto
  ): Promise<CategorizedCriteria> {
    const { recopilationId, criteriaId, categoryId } =
      createCategorizedCriteriaDto

    const recopilation = await this.recopilationRepository.findOneByOrFail({
      id: recopilationId
    })
    const criterion = await this.criterionRepository.findOneByOrFail({
      id: criteriaId
    })
    const category = await this.categoryRepository.findOneByOrFail({
      id: categoryId
    })

    const categorizedCriteria = this.categorizedCriteriaRepository.create({
      recopilation,
      criterion,
      category
    })

    return this.categorizedCriteriaRepository.save(categorizedCriteria)
  }

  async update(
    id: number,
    updateCategorizedCriteriaDto: UpdateCategorizedCriterionDto
  ): Promise<CategorizedCriteria> {
    const categorizedCriteria =
      await this.categorizedCriteriaRepository.findOneOrFail({
        where: { id },
        relations: ['recopilation', 'criterion', 'category']
      })

    const { recopilationId, criteriaId, categoryId } =
      updateCategorizedCriteriaDto

    const recopilation = await this.recopilationRepository.findOneByOrFail({
      id: recopilationId
    })
    categorizedCriteria.recopilation = recopilation

    const criterion = await this.criterionRepository.findOneByOrFail({
      id: criteriaId
    })
    categorizedCriteria.criterion = criterion

    const category = await this.categoryRepository.findOneByOrFail({
      id: categoryId
    })
    categorizedCriteria.category = category

    await this.categorizedCriteriaRepository.save(categorizedCriteria)

    return this.categorizedCriteriaRepository.findOneOrFail({
      where: { id },
      relations: ['recopilation', 'criterion', 'category']
    })
  }

  async remove(id: number): Promise<void> {
    const categorizedCriteria =
      await this.categorizedCriteriaRepository.findOneOrFail({
        where: { id },
        relations: ['recopilation', 'criterion', 'category']
      })
    await this.categorizedCriteriaRepository.remove(categorizedCriteria)
  }
}
