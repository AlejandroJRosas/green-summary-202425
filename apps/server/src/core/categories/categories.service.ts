import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { Category } from './entities/category.entity'
import { Indicator } from '../indicators/entities/indicator.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'

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
      index: createCategoryDto.idIndicator
    })

    const category = this.categoryRepository.create({
      ...createCategoryDto,
      indicator: indicator
    })

    return this.categoryRepository.save(category)
  }

  async getAllCategories({
    page,
    itemsPerPage
  }: PaginationParams): Promise<{ categories: Category[]; count: number }> {
    const [categories, count] = await this.categoryRepository.findAndCount({
      relations: ['indicator'],
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage
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

  async categoriesByIndicator(idIndicator: number): Promise<Category[]> {
    const indicator = await this.indicatorRepository.findOneByOrFail({
      index: idIndicator
    })

    if (!indicator) {
      throw new NotFoundException(`Indicator with ID ${idIndicator} not found`)
    }

    return this.categoryRepository.find({
      where: { indicator: indicator },
      relations: ['indicator']
    })
  }
}
