import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Res,
  HttpStatus,
  HttpCode,
  Query
} from '@nestjs/common'
import { Response } from 'express'
import { RecopilationsService } from './recopilations.service'
import { CreateRecopilationDto } from './dto/create-recopilation.dto'
import { UpdateRecopilationDto } from './dto/update-recopilation.dto'
import { ApiTags } from '@nestjs/swagger'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'

@ApiTags('Recopilations')
@Controller('recopilations')
export class RecopilationsController {
  constructor(private readonly recopilationsService: RecopilationsService) {}

  @Get()
  async findAll(
    @Query() { page = 1, itemsPerPage = 10 }: PaginationParams,
    @Res() res: Response
  ): Promise<void> {
    const { recopilation, count } = await this.recopilationsService.findAll({
      page,
      itemsPerPage
    })

    const paginatedItems = constructPaginatedItemsDto(
      recopilation,
      count,
      page,
      itemsPerPage
    )
    res.status(HttpStatus.OK).json(paginatedItems)
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const recopilation = await this.recopilationsService.findOne(+id)

    res.json(recopilation)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() recopilationData: CreateRecopilationDto,
    @Res() res: Response
  ): Promise<void> {
    const createdRecopilation =
      await this.recopilationsService.create(recopilationData)

    res.json(createdRecopilation)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() recopilationData: UpdateRecopilationDto,
    @Res() res: Response
  ): Promise<void> {
    const updatedRecopilation = await this.recopilationsService.update(
      +id,
      recopilationData
    )

    res.json(updatedRecopilation)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return await this.recopilationsService.remove(+id)
  }
}
