import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
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
    try {
      const category = await this.categoriesService.getOneCategory(Number(id))
      return response.json(category)
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message })
      }
      return response.status(500).json({ message: 'Internal Server Error' })
    }
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
    try {
      const category = await this.categoriesService.updateCategory(
        Number(id),
        updatedCategory
      )
      return response.json(category)
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message })
      }
      return response.status(500).json({ message: 'Internal Server Error' })
    }
  }

  @Delete('/:id')
  async deleteCategory(@Param('id') id: string, @Res() response: Response) {
    try {
      await this.categoriesService.deleteCategory(Number(id))
      return response.status(204).send()
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message })
      }
      return response.status(500).json({ message: 'Internal Server Error' })
    }
  }

  @Get('/indicator/:idIndicator')
  async getCategoriesByIndicator(
    @Param('idIndicator') idIndicator: string,
    @Res() response: Response
  ) {
    try {
      const categories = await this.categoriesService.categoryByIndicator(
        Number(idIndicator)
      )
      return response.json(categories)
    } catch (error) {
      if (error instanceof NotFoundException) {
        return response.status(404).json({ message: error.message })
      }
      return response.status(500).json({ message: 'Internal Server Error' })
    }
  }
}