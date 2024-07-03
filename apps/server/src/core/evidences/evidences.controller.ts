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
  UploadedFile,
  ParseFilePipeBuilder
} from '@nestjs/common'
import { EvidencesService } from './evidences.service'
import { CreateEvidenceDto } from './dto/create-evidence.dto'
import { UpdateEvidenceDto } from './dto/update-evidence.dto'
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { constructPaginatedItemsDto } from 'src/shared/pagination/construct-paginated-items-dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-evidences-by-param.dto'
import { Roles } from '../auth/roles.decorator'
import { Role } from '../auth/role.enum'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { renameFile, fileFilter } from 'src/shared/file-upload'
import { ConfigService } from 'nestjs-config'

@ApiTags('Evidences')
@Controller('evidences')
@Roles(Role.Coordinator, Role.Admin, Role.Department)
export class EvidencesController {
  constructor(
    private configService: ConfigService,
    private readonly evidencesService: EvidencesService
  ) {}

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
        destination: './uploads',
        filename: renameFile
      }),
      limits: { fileSize: 2097152 },
      fileFilter: fileFilter
    })
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        description: {
          type: 'string'
        },
        error: {
          type: 'string'
        },
        type: {
          type: 'string'
        },
        externalLink: {
          type: 'string'
        },
        fileLink: {
          type: 'string',
          format: 'binary'
        },
        collectionId: {
          type: 'number'
        }
      }
    }
  })
  async create(
    @UploadedFile() fileLink: Express.Multer.File,
    @Body() createEvidenceDto: CreateEvidenceDto
  ) {
    const name = this.configService.get('link')
    createEvidenceDto.fileLink = `${name.URL_BACK}/uploads/${fileLink.filename}`
    const newEvidence = await this.evidencesService.create(createEvidenceDto)
    return newEvidence
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('fileLink', {
      storage: diskStorage({
        destination: './uploads',
        filename: renameFile
      }),
      limits: { fileSize: 2097152 }
    })
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        description: {
          type: 'string'
        },
        error: {
          type: 'string'
        },
        type: {
          type: 'string'
        },
        externalLink: {
          type: 'string'
        },
        fileLink: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  async update(
    @Param('id') id: string,
    @Body() updateEvidenceDto: UpdateEvidenceDto,
    @UploadedFile(
      new ParseFilePipeBuilder().build({
        fileIsRequired: false
      })
    )
    fileLink: Express.Multer.File
  ) {
    const name = this.configService.get('link')
    console.log(fileLink)
    if (fileLink !== undefined) {
      updateEvidenceDto.fileLink = `${name.URL_BACK}/uploads/${fileLink.filename}`
    }
    console.log(updateEvidenceDto.fileLink)
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
