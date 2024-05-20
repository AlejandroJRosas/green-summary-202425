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
import { InformationCollectionsService } from './information-collections.service'
import { CreateInformationCollectionDto } from './dto/create-information-collection.dto'
import { UpdateInformationCollectionDto } from './dto/update-information-collection.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Information Collections')
@Controller('information-collections')
export class InformationCollectionsController {
  constructor(
    private readonly informationCollectionsService: InformationCollectionsService
  ) {}

  @Get()
  async findAll(@Res() res: Response): Promise<void> {
    const collections = await this.informationCollectionsService.findAll()

    res.status(HttpStatus.OK).json(collections)
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response): Promise<void> {
    const collection = await this.informationCollectionsService.findOne(id)

    res.json(collection)
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createInformationCollectionDto: CreateInformationCollectionDto,
    @Res() res: Response
  ): Promise<void> {
    const newCollection = await this.informationCollectionsService.create(
      createInformationCollectionDto
    )
    res.json(newCollection)
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateInformationCollectionDto: UpdateInformationCollectionDto,
    @Res() res: Response
  ): Promise<void> {
    const updatedCollection = await this.informationCollectionsService.update(
      id,
      updateInformationCollectionDto
    )
    if (updatedCollection) {
      res.status(HttpStatus.OK).json(updatedCollection)
    } else {
      res.status(HttpStatus.NOT_FOUND).json({ message: 'Collection not found' })
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number): Promise<void> {
    await this.informationCollectionsService.remove(id)
  }
}