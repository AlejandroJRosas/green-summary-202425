import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CategoriesPerRecopilation } from './entities/categories_per_recopilation.entity'
import { CreateCategoriesPerRecopilationDto } from './dto/create-categories_per_recopilation.dto'
import { UpdateCategoriesPerRecopilationDto } from './dto/update-categories_per_recopilation.dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { Category } from '../categories/entities/category.entity'
import { Recopilation } from '../recopilations/entities/recopilation.entity'

@Injectable()
export class CategoriesPerRecopilationsService {
  constructor(
    @InjectRepository(CategoriesPerRecopilation)
    private readonly categoriesPerRecopilationsRepository: Repository<CategoriesPerRecopilation>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Recopilation)
    private readonly recopilationRepository: Repository<Recopilation>
  ) {}

  async findAll({ page, itemsPerPage }: PaginationParams): Promise<{
    categoriesPerRecopilation: CategoriesPerRecopilation[]
    count: number
  }> {
    const [categoriesPerRecopilation, count] =
      await this.categoriesPerRecopilationsRepository.findAndCount({
        take: Number(itemsPerPage),
        skip: (Number(page) - 1) * Number(itemsPerPage),
        relations: ['recopilation', 'category']
      })

    return { categoriesPerRecopilation, count }
  }

  async findOne(id: number): Promise<CategoriesPerRecopilation> {
    return this.categoriesPerRecopilationsRepository.findOneOrFail({
      where: { id },
      relations: ['recopilation', 'category']
    })
  }

  async create(
    createCategoriesPerRecopilationsDto: CreateCategoriesPerRecopilationDto
  ): Promise<CategoriesPerRecopilation> {
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
    updateCategoriesPerRecopilationsDto: UpdateCategoriesPerRecopilationDto
  ): Promise<CategoriesPerRecopilation> {
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
