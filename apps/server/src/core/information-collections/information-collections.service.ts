import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { InformationCollection } from './entities/information-collection.entity'
import { CreateInformationCollectionDto } from './dto/create-information-collection.dto'
import { UpdateInformationCollectionDto } from './dto/update-information-collection.dto'

@Injectable()
export class InformationCollectionsService {
  constructor(
    @InjectRepository(InformationCollection)
    private informationCollectionsRepository: Repository<InformationCollection>
  ) {}

  findAll(): Promise<InformationCollection[]> {
    return this.informationCollectionsRepository.find()
  }

  findOne(id: number): Promise<InformationCollection> {
    return this.informationCollectionsRepository.findOneByOrFail({ id })
  }

  create(
    createInformationCollectionDto: CreateInformationCollectionDto
  ): Promise<InformationCollection> {
    const informationCollection = this.informationCollectionsRepository.create(
      createInformationCollectionDto
    )
    return this.informationCollectionsRepository.save(informationCollection)
  }

  async update(
    id: number,
    updateInformationCollectionDto: UpdateInformationCollectionDto
  ): Promise<InformationCollection> {
    await this.informationCollectionsRepository.update(
      id,
      updateInformationCollectionDto
    )
    return this.informationCollectionsRepository.findOneByOrFail({ id })
  }

  async remove(id: number): Promise<void> {
    await this.informationCollectionsRepository.delete(id)
  }
}
