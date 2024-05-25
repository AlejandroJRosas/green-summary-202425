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
import { EvidencesService } from './evidences.service'
import { CreateEvidenceDto } from './dto/create-evidence.dto'
import { UpdateEvidenceDto } from './dto/update-evidence.dto'
import { ApiTags } from '@nestjs/swagger'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'

@ApiTags('Evidences')
@Controller('evidences')
export class EvidencesController {
  constructor(private readonly evidencesService: EvidencesService) {}

  @Get()
  async findAll(
    @Query() { page = 1, itemsPerPage = 10 }: PaginationParams,
    @Res() response: Response
  ) {
    const { evidences, count } = await this.evidencesService.findAll({
      page,
      itemsPerPage
    })

    const paginatedItems = constructPaginatedItemsDto(
      evidences,
      count,
      page,
      itemsPerPage
    )
    return response.json(paginatedItems)
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
