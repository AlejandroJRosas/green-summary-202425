import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
  HttpCode,
  Query
} from '@nestjs/common'
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
  async findAll(@Query() { page = 1, itemsPerPage = 10 }: PaginationParams) {
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
    return paginatedItems
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const evidence = await this.evidencesService.findOne(+id)
    return evidence
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createEvidenceDto: CreateEvidenceDto) {
    const newEvidence = await this.evidencesService.create(createEvidenceDto)
    return newEvidence
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEvidenceDto: UpdateEvidenceDto
  ) {
    const updatedEvidence = await this.evidencesService.update(
      +id,
      updateEvidenceDto
    )

    return updatedEvidence
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.evidencesService.remove(+id)
  }
}
