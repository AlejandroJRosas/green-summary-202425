import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CriteriaPerRecopilation } from '../criteria_per_recopilations/entities/criteria_per_recopilation.entity'
import { CreateCriteriaPerRecopilationDto } from '../criteria_per_recopilations/dto/create-criteria_per_recopilation.dto'
import { UpdateCriteriaPerRecopilationDto } from '../criteria_per_recopilations/dto/update-criteria_per_recopilation.dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { Recopilation } from '../recopilations/entities/recopilation.entity'
import { Criterion } from '../criteria/entities/criterion.entity'

@Injectable()
export class CriteriaPerRecopilationsService {
  constructor(
    @InjectRepository(CriteriaPerRecopilation)
    private readonly criteriaPerRecopilationsRepository: Repository<CriteriaPerRecopilation>,
    @InjectRepository(Recopilation)
    private readonly recopilationRepository: Repository<Recopilation>,
    @InjectRepository(Criterion)
    private readonly criterionRepository: Repository<Criterion>
  ) {}

  async findAll({ page, itemsPerPage }: PaginationParams): Promise<{
    criteriaPerRecopilations: CriteriaPerRecopilation[]
    count: number
  }> {
    const [criteriaPerRecopilations, count] =
      await this.criteriaPerRecopilationsRepository.findAndCount({
        take: Number(itemsPerPage),
        skip: (Number(page) - 1) * Number(itemsPerPage),
        relations: ['recopilation', 'criterion']
      })

    return { criteriaPerRecopilations, count }
  }

  async findOne(id: number): Promise<CriteriaPerRecopilation> {
    return this.criteriaPerRecopilationsRepository.findOneOrFail({
      where: { id },
      relations: ['recopilation', 'criterion']
    })
  }

  async create(
    createCriteriaPerRecopilationDto: CreateCriteriaPerRecopilationDto
  ): Promise<CriteriaPerRecopilation> {
    const { recopilationId, indicatorIndex, subIndex } =
      createCriteriaPerRecopilationDto

    const recopilation = await this.recopilationRepository.findOneByOrFail({
      id: recopilationId
    })
    const criterion = await this.criterionRepository.findOneByOrFail({
      indicatorIndex,
      subIndex
    })

    const criteriaPerRecopilation =
      this.criteriaPerRecopilationsRepository.create({
        recopilation,
        criterion
      })

    return this.criteriaPerRecopilationsRepository.save(criteriaPerRecopilation)
  }

  async update(
    id: number,
    updateCriteriaPerRecopilationDto: UpdateCriteriaPerRecopilationDto
  ): Promise<CriteriaPerRecopilation> {
    const criteriaPerRecopilation =
      await this.criteriaPerRecopilationsRepository.findOneOrFail({
        where: { id },
        relations: ['recopilation', 'criterion']
      })

    const { recopilationId, indicatorIndex, subIndex } =
      updateCriteriaPerRecopilationDto

    const recopilation = await this.recopilationRepository.findOneByOrFail({
      id: recopilationId
    })
    criteriaPerRecopilation.recopilation = recopilation

    const criterion = await this.criterionRepository.findOneByOrFail({
      indicatorIndex,
      subIndex
    })
    criteriaPerRecopilation.criterion = criterion

    await this.criteriaPerRecopilationsRepository.save(criteriaPerRecopilation)

    return this.criteriaPerRecopilationsRepository.findOneOrFail({
      where: { id },
      relations: ['recopilation', 'criterion']
    })
  }

  async remove(id: number): Promise<void> {
    const criteriaPerRecopilation =
      await this.criteriaPerRecopilationsRepository.findOneOrFail({
        where: { id },
        relations: ['recopilation', 'criterion']
      })
    await this.criteriaPerRecopilationsRepository.remove(
      criteriaPerRecopilation
    )
  }
}
