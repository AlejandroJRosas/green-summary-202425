import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCriteriaDto } from './dto/create-criteria.dto'
import { UpdateCriteriaDto } from './dto/update-criteria.dto'
import { Criteria } from './entities/criteria.entity'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'

@Injectable()
export class CriterionService {
  constructor(
    @InjectRepository(Criteria)
    private readonly criterionRepository: Repository<Criteria>
  ) {}

  async createCriterion(
    createCriterionDto: CreateCriteriaDto
  ): Promise<Criteria> {
    const criterion = this.criterionRepository.create(createCriterionDto)
    return this.criterionRepository.save(criterion)
  }

  async getAllCriteria({
    page,
    itemsPerPage
  }: PaginationParams): Promise<{ criteria: Criteria[]; count: number }> {
    const [criteria, count] = await this.criterionRepository.findAndCount({
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage
    })

    return { criteria, count }
  }

  async getOneCriterion(
    indicatorIndex: number,
    subIndex: number
  ): Promise<Criteria> {
    const criterion = await this.criterionRepository.findOneByOrFail({
      indicatorIndex,
      subIndex
    })
    return criterion
  }

  async updateCriterion(
    indicatorIndex: number,
    subIndex: number,
    updateCriterionDto: UpdateCriteriaDto
  ): Promise<Criteria> {
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
