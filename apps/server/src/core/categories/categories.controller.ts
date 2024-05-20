import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { Response } from 'express'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories(@Res() response: Response) {
    const categories = await this.categoriesService.getAllCategories()
    return response.json(categories)
  }

  @Get('/:id')
  async getCategory(@Param('id') id: string, @Res() response: Response) {
    const category = await this.categoriesService.getOneCategory(Number(id))
    return response.json(category)
  }

  @Post()
  @HttpCode(201)
  @UsePipes(new ValidationPipe())
  async createCategory(
    @Body() newCategory: CreateCategoryDto,
    @Res() response: Response
  ) {
    const createdCategory = await this.categoriesService.create(newCategory)
    return response.json(createdCategory)
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  async updateCategory(
    @Param('id') id: string,
    @Body() updatedCategory: UpdateCategoryDto,
    @Res() response: Response
  ) {
    const category = await this.categoriesService.updateCategory(
      Number(id),
      updatedCategory
    )
    return response.json(category)
  }

  @Delete('/:id')
  async deleteCategory(@Param('id') id: string, @Res() response: Response) {
    await this.categoriesService.deleteCategory(Number(id))
    return response.status(204).send()
  }

  @Get('/indicator/:indicatorIndex')
  async getCategoriesByIndicator(
    @Param('indicatorIndex') indicatorIndex: string,
    @Res() response: Response
  ) {
    const categories = await this.categoriesService.categoriesByIndicator(
      Number(indicatorIndex)
    )
    return response.json(categories)
  }
}
