// recopilations.controller.ts

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
  NotFoundException
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
    if (!recopilation) {
      throw new NotFoundException(`Recopilation with ID ${id} not found.`)
    }
    res.status(HttpStatus.OK).json(recopilation)
  }

  @Post()
  async create(
    @Body() recopilationData: CreateRecopilationDto,
    @Res() res: Response
  ): Promise<void> {
    const createdRecopilation =
      await this.recopilationsService.create(recopilationData)
    res.status(HttpStatus.CREATED).json(createdRecopilation)
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
    if (!updatedRecopilation) {
      throw new NotFoundException(`Recopilation with ID ${id} not found.`)
    }
    res.status(HttpStatus.OK).json(updatedRecopilation)
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response): Promise<void> {
    await this.recopilationsService.remove(+id)
    res.status(HttpStatus.NO_CONTENT).send()
  }
}
