import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  HttpStatus,
  HttpCode,
  Query
} from '@nestjs/common'
import { Response } from 'express'
import { CategoriesPerRecopilationsService } from './categories_per_recopilations.service'
import { CreateCategoriesPerRecopilationDto } from './dto/create-categories_per_recopilation.dto'
import { UpdateCategoriesPerRecopilationDto } from './dto/update-categories_per_recopilation.dto'
import { ApiTags } from '@nestjs/swagger'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'

@ApiTags('Categories_Per_Recopilations')
@Controller('categories-per-recopilations')
export class CategoriesPerRecopilationsController {
  constructor(
    private readonly categoriesPerRecopilationsService: CategoriesPerRecopilationsService
  ) {}

  @Get()
  async findAll(
    @Query() { page = 1, itemsPerPage = 10 }: PaginationParams,
    @Res() response: Response
  ) {
    const { categoriesPerRecopilation, count } =
      await this.categoriesPerRecopilationsService.findAll({
        page,
        itemsPerPage
      })

    const paginatedItems = constructPaginatedItemsDto(
      categoriesPerRecopilation,
      count,
      page,
      itemsPerPage
    )
    return response.status(HttpStatus.OK).json(paginatedItems)
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response): Promise<void> {
    const indicatorsPerRecopilations =
      await this.categoriesPerRecopilationsService.findOne(id)
    res.json(indicatorsPerRecopilations)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body()
    createCategoriesPerRecopilationsDto: CreateCategoriesPerRecopilationDto,
    @Res() res: Response
  ): Promise<void> {
    const newCategoriesPerRecopilations =
      await this.categoriesPerRecopilationsService.create(
        createCategoriesPerRecopilationsDto
      )
    res.json(newCategoriesPerRecopilations)
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body()
    updateIndicatorsPerRecopilationsDto: UpdateCategoriesPerRecopilationDto,
    @Res() res: Response
  ): Promise<void> {
    const updatedCategoriesPerRecopilations =
      await this.categoriesPerRecopilationsService.update(
        id,
        updateIndicatorsPerRecopilationsDto
      )
    if (updatedCategoriesPerRecopilations) {
      res.status(HttpStatus.OK).json(updatedCategoriesPerRecopilations)
    } else {
      res
        .status(HttpStatus.NOT_FOUND)
        .json({ message: 'Categories per recopilation not found' })
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number): Promise<void> {
    await this.categoriesPerRecopilationsService.remove(id)
  }
}
