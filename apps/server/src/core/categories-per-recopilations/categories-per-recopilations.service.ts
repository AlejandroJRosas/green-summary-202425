import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CategoryPerRecopilation } from './entities/category-per-recopilation.entity'
import { CreateCategoryPerRecopilationDto } from './dto/create-category-per-recopilation.dto'
import { UpdateCategoryPerRecopilationDto } from './dto/update-category-per-recopilation.dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { Category } from '../categories/entities/category.entity'
import { Recopilation } from '../recopilations/entities/recopilation.entity'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { parseFiltersToTypeOrm } from 'src/shared/filtering/parse-filters-to-type-orm'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-by-categories-per-recopilations-by-param.dto'

@Injectable()
export class CategoriesPerRecopilationsService {
  constructor(
    @InjectRepository(CategoryPerRecopilation)
    private readonly categoriesPerRecopilationsRepository: Repository<CategoryPerRecopilation>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Recopilation)
    private readonly recopilationRepository: Repository<Recopilation>
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
    const [categoriesPerRecopilation, count] =
      await this.categoriesPerRecopilationsRepository.findAndCount({
        take: Number(itemsPerPage),
        skip: (Number(page) - 1) * Number(itemsPerPage),
        relations: ['recopilation', 'category'],
        order: { [orderBy]: orderType },
        where: parseFiltersToTypeOrm(filters)
      })

    return { categoriesPerRecopilation, count }
  }

  async findOne(id: number): Promise<CategoryPerRecopilation> {
    return this.categoriesPerRecopilationsRepository.findOneOrFail({
      where: { id },
      relations: ['recopilation', 'category']
    })
  }

  async create(
    createCategoriesPerRecopilationsDto: CreateCategoryPerRecopilationDto
  ): Promise<CategoryPerRecopilation> {
    const { IDRecopilation, IDCategory } = createCategoriesPerRecopilationsDto

    const recopilation = await this.recopilationRepository.findOneByOrFail({
      id: IDRecopilation
    })
    const category = await this.categoryRepository.findOneByOrFail({
      id: IDCategory
    })

    const categoriesPerRecopilations =
      this.categoriesPerRecopilationsRepository.create({
        recopilation,
        category
      })

    return this.categoriesPerRecopilationsRepository.save(
      categoriesPerRecopilations
    )
  }

  async update(
    id: number,
    updateCategoriesPerRecopilationsDto: UpdateCategoryPerRecopilationDto
  ): Promise<CategoryPerRecopilation> {
    const categoriesPerRecopilations =
      await this.categoriesPerRecopilationsRepository.findOneOrFail({
        where: { id },
        relations: ['recopilation', 'category']
      })

    const { IDRecopilation, IDCategory } = updateCategoriesPerRecopilationsDto

    const recopilation = await this.recopilationRepository.findOneByOrFail({
      id: IDRecopilation
    })
    categoriesPerRecopilations.recopilation = recopilation

    const category = await this.categoryRepository.findOneByOrFail({
      id: IDCategory
    })
    categoriesPerRecopilations.category = category

    await this.categoriesPerRecopilationsRepository.save(
      categoriesPerRecopilations
    )

    return this.categoriesPerRecopilationsRepository.findOneOrFail({
      where: { id },
      relations: ['recopilation', 'category']
    })
  }

  async remove(id: number): Promise<void> {
    const categoriesPerRecopilations =
      await this.categoriesPerRecopilationsRepository.findOneOrFail({
        where: { id },
        relations: ['recopilation', 'category']
      })
    await this.categoriesPerRecopilationsRepository.remove(
      categoriesPerRecopilations
    )
  }
}
