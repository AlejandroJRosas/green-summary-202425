import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus
} from '@nestjs/common'
import { Response } from 'express'
import { RecommendService } from './recommends.service'
import { CreateRecommendationDto } from './dto/create-recommendation.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Recommendations')
@Controller('recommendations')
export class RecommendController {
  constructor(private readonly recommendService: RecommendService) {}

  @Post()
  async create(
    @Body() createRecommendDto: CreateRecommendationDto,
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

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const result = await this.recommendService.findOne(id)
    return res.status(HttpStatus.OK).json(result)
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res: Response) {
    await this.recommendService.remove(id)
    return res.status(HttpStatus.NO_CONTENT).send()
  }
}
