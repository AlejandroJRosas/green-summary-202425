import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  HttpStatus
} from '@nestjs/common'
import { Response } from 'express'
import { EvidencesService } from './evidences.service'
import { CreateEvidenceDto } from './dto/create-evidence.dto'
import { UpdateEvidenceDto } from './dto/update-evidence.dto'

@Controller('evidences')
export class EvidencesController {
  constructor(private readonly evidencesService: EvidencesService) {}

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    const evidences = await this.evidencesService.findAll()
    res.status(HttpStatus.OK).json(evidences)
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response): Promise<void> {
    const evidence = await this.evidencesService.findOne(+id)
    if (evidence) {
      res.status(HttpStatus.OK).json(evidence)
    } else {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Evidence not found' })
    }
  }

  @Post()
  async create(
    @Body() createEvidenceDto: CreateEvidenceDto,
    @Res() res: Response
  ): Promise<void> {
    const newEvidence = await this.evidencesService.create(createEvidenceDto)
    res.status(HttpStatus.CREATED).json(newEvidence)
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
    if (updatedEvidence) {
      res.status(HttpStatus.OK).json(updatedEvidence)
    } else {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Evidence not found' })
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response): Promise<void> {
    await this.evidencesService.remove(+id)
    res.status(HttpStatus.NO_CONTENT).send()
  }
}
