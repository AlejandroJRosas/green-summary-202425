import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus
} from '@nestjs/common'
import { Response } from 'express'
import { RecommendService } from './recommends.service'
import { CreateRecommendDto } from './dto/create-recommend.dto'
import { UpdateRecommendDto } from './dto/update-recommend.dto'

@Controller('recommends')
export class RecommendController {
  constructor(private readonly recommendService: RecommendService) {}

  @Post()
  async create(
    @Body() createRecommendDto: CreateRecommendDto,
    @Res() res: Response
  ) {
    const result = await this.recommendService.create(createRecommendDto)
    return res.status(HttpStatus.CREATED).json(result)
  }

  @Get()
  async findAll(@Res() res: Response) {
    const result = await this.recommendService.findAll()
    return res.status(HttpStatus.OK).json(result)
  }

  @Get(':IDDepartamento/:IDCategoria')
  async findOne(
    @Param('IDDepartamento') IDDepartamento: number,
    @Param('IDCategoria') IDCategoria: number,
    @Res() res: Response
  ) {
    const result = await this.recommendService.findOne(
      IDDepartamento,
      IDCategoria
    )
    return res.status(HttpStatus.OK).json(result)
  }

  @Patch(':IDDepartamento/:IDCategoria')
  async update(
    @Param('IDDepartamento') IDDepartamento: number,
    @Param('IDCategoria') IDCategoria: number,
    @Body() updateRecommendDto: UpdateRecommendDto,
    @Res() res: Response
  ) {
    const result = await this.recommendService.update(
      IDDepartamento,
      IDCategoria,
      updateRecommendDto
    )
    return res.status(HttpStatus.OK).json(result)
  }

  @Delete(':IDDepartamento/:IDCategoria')
  async remove(
    @Param('IDDepartamento') IDDepartamento: number,
    @Param('IDCategoria') IDCategoria: number,
    @Res() res: Response
  ) {
    await this.recommendService.remove(IDDepartamento, IDCategoria)
    return res.status(HttpStatus.NO_CONTENT).send()
  }
}
