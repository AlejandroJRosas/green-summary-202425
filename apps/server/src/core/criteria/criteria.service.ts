import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCriterionDto } from './dto/create-criterion.dto'
import { UpdateCriterionDto } from './dto/update-criterion.dto'
import { Criterion } from './entities/criterion.entity'

@Injectable()
export class CriterionService {
  constructor(
    @InjectRepository(Criterion)
    private readonly criterionRepository: Repository<Criterion>
  ) {}

  async createCriterion(
    createCriterionDto: CreateCriterionDto
  ): Promise<Criterion> {
    const criterion = this.criterionRepository.create(createCriterionDto)
    return this.criterionRepository.save(criterion)
  }

  async getAllCriteria(): Promise<Criterion[]> {
    return this.criterionRepository.find()
  }

  async getOneCriterion(
    indicatorIndex: number,
    subIndex: number
  ): Promise<Criterion> {
    const criterion = await this.criterionRepository.findOneByOrFail({
      indicatorIndex,
      subIndex
    })
    return criterion
  }

  async updateCriterion(
    indicatorIndex: number,
    subIndex: number,
    updateCriterionDto: UpdateCriterionDto
  ): Promise<Criterion> {
    await this.criterionRepository.update(
      { indicatorIndex, subIndex },
      updateCriterionDto
    )
    const updatedCriterion = await this.getOneCriterion(
      indicatorIndex,
      subIndex
    )
    return updatedCriterion
  }

  async deleteCriterion(
    indicatorIndex: number,
    subIndex: number
  ): Promise<void> {
    const result = await this.criterionRepository.delete({
      indicatorIndex,
      subIndex
    })
    if (result.affected === 0) {
      throw new NotFoundException(
        `Criterion with IndicatorIndex ${indicatorIndex} and SubIndex ${subIndex} not found`
      )
    }
  }
}
