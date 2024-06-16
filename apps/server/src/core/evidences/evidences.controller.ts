import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
  Patch,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common'
import { EvidencesService } from './evidences.service'
import { CreateEvidenceDto } from './dto/create-evidence.dto'
import { UpdateEvidenceDto } from './dto/update-evidence.dto'
import { ApiTags } from '@nestjs/swagger'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-evidences-by-param.dto'
import { Roles } from '../auth/roles.decorator'
import { Role } from '../auth/role.enum'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { renameFile } from 'src/shared/file-upload'

@ApiTags('Evidences')
@Controller('evidences')
@Roles(Role.Coordinator, Role.Admin, Role.Department)
export class EvidencesController {
  constructor(private readonly evidencesService: EvidencesService) {}

  @Get()
  async findAll(
    @Query() { page = 1, itemsPerPage = 10 }: PaginationParams,
    @Query() { orderBy = 'id' }: OrderByParamDto,
    @Query() { orderType = 'ASC' }: OrderTypeParamDto,
    @Query() { filters = [] }: FiltersSegmentDto
  ) {
    const { evidences, count } = await this.evidencesService.findAll({
      page,
      itemsPerPage,
      orderBy,
      orderType,
      filters
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
  @UseInterceptors(
    FileInterceptor('fileLink', {
      storage: diskStorage({
        destination: './upload',
        filename: renameFile
      })
    })
  )
  async create(
    @UploadedFile() fileLink: Express.Multer.File,
    @Body() createEvidenceDto: CreateEvidenceDto
  ) {
    console.log(fileLink)
    const newEvidence = await this.evidencesService.create(createEvidenceDto)
    return newEvidence
  }

  @Patch(':id')
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
