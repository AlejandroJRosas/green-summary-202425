import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CategorizedCriteria } from './entities/categorized_criterion.entity'
import { CreateCategorizedCriteriaDto } from './dto/create-categorized_criterion.dto'
import { UpdateCategorizedCriterionDto } from './dto/update-categorized_criterion.dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { Recopilation } from '../recopilations/entities/recopilation.entity'
import { Criterion } from '../criteria/entities/criterion.entity'
import { Category } from '../categories/entities/category.entity'

@Injectable()
export class CategorizedCriteriaService {
  constructor(
    @InjectRepository(CategorizedCriteria)
    private readonly categorizedCriteriaRepository: Repository<CategorizedCriteria>,
    @InjectRepository(Recopilation)
    private readonly recopilationRepository: Repository<Recopilation>,
    @InjectRepository(Criterion)
    private readonly criterionRepository: Repository<Criterion>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async findAll({
    page,
    itemsPerPage
  }: PaginationParams): Promise<{
    categorizedCriteria: CategorizedCriteria[]
    count: number
  }> {
    const [categorizedCriteria, count] =
      await this.categorizedCriteriaRepository.findAndCount({
        take: Number(itemsPerPage),
        skip: (Number(page) - 1) * Number(itemsPerPage),
        relations: ['recopilation', 'criterion', 'category']
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
    const { recopilationId, indicatorIndex, subIndex, categoryId } =
      createCategorizedCriteriaDto

    const recopilation = await this.recopilationRepository.findOneByOrFail({
      id: recopilationId
    })
    const criterion = await this.criterionRepository.findOneByOrFail({
      indicatorIndex,
      subIndex
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

    const { recopilationId, indicatorIndex, subIndex, categoryId } =
      updateCategorizedCriteriaDto

    const recopilation = await this.recopilationRepository.findOneByOrFail({
      id: recopilationId
    })
    categorizedCriteria.recopilation = recopilation

    const criterion = await this.criterionRepository.findOneByOrFail({
      indicatorIndex,
      subIndex
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
