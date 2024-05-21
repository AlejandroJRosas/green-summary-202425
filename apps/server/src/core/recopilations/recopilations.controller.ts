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
  HttpCode
} from '@nestjs/common'
import { Response } from 'express'
import { RecopilationsService } from './recopilations.service'
import { CreateRecopilationDto } from './dto/create-recopilation.dto'
import { UpdateRecopilationDto } from './dto/update-recopilation.dto'

@Controller('recopilations')
export class RecopilationsController {
  constructor(private readonly recopilationsService: RecopilationsService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    const recopilations = await this.recopilationsService.findAll()

    res.status(HttpStatus.OK).json(recopilations)
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
