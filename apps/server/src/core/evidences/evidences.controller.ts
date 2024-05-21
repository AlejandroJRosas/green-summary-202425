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
  HttpCode
} from '@nestjs/common'
import { Response } from 'express'
import { EvidencesService } from './evidences.service'
import { CreateEvidenceDto } from './dto/create-evidence.dto'
import { UpdateEvidenceDto } from './dto/update-evidence.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Evidences')
@Controller('evidences')
export class EvidencesController {
  constructor(private readonly evidencesService: EvidencesService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    const evidences = await this.evidencesService.findAll()

    res.json(evidences)
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const evidence = await this.evidencesService.findOne(+id)

    res.json(evidence)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createEvidenceDto: CreateEvidenceDto,
    @Res() res: Response
  ): Promise<void> {
    const newEvidence = await this.evidencesService.create(createEvidenceDto)

    res.json(newEvidence)
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEvidenceDto: UpdateEvidenceDto,
    @Res() res: Response
  ): Promise<void> {
    const updatedEvidence = await this.evidencesService.update(
      +id,
      updateEvidenceDto
    )

    res.json(updatedEvidence)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.evidencesService.remove(+id)
  }
}
