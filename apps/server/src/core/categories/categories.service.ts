import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Category } from './entities/category.entity'
import { Indicator } from '../indicators/entities/indicator.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { parseFiltersToTypeOrm } from 'src/shared/filtering/parse-filters-to-type-orm'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-categories-by-param.dto'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Indicator)
    private readonly indicatorRepository: Repository<Indicator>
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const indicator = await this.indicatorRepository.findOneByOrFail({
      index: createCategoryDto.indicatorId
    })

    const category = this.categoryRepository.create({
      ...createCategoryDto,
      indicator: indicator
    })

    return this.categoryRepository.save(category)
  }

  async getAllCategories({
    page,
    itemsPerPage,
    orderBy,
    orderType,
    filters
  }: PaginationParams &
    OrderByParamDto &
    OrderTypeParamDto &
    FiltersSegmentDto) {
    const [categories, count] = await this.categoryRepository.findAndCount({
      relations: ['indicator'],
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
      order: { [orderBy]: orderType },
      where: parseFiltersToTypeOrm(filters)
    })

    return { categories, count }
  }

  async getOneCategory(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['indicator']
    })
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }
    return category
  }

  async updateCategory(
    id: number,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<Category> {
    await this.categoryRepository.update(id, updateCategoryDto)
    const updatedCategory = await this.categoryRepository.findOne({
      where: { id },
      relations: ['indicator']
    })
    if (!updatedCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }
    return updatedCategory
  }

  async deleteCategory(id: number): Promise<void> {
    const result = await this.categoryRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`Category with ID ${id} not found`)
    }
  }

  async categoriesByIndicator(indicatorId: number): Promise<Category[]> {
    const indicator = await this.indicatorRepository.findOneByOrFail({
      index: indicatorId
    })

    if (!indicator) {
      throw new NotFoundException(`Indicator with ID ${indicatorId} not found`)
    }

    return this.categoryRepository.find({
      where: { indicator: indicator },
      relations: ['indicator']
    })
  }
}
