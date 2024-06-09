import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IndicatorPerRecopilation } from './entities/indicator-per-recopilatio.entity'
import { CreateIndicatorPerRecopilationDto } from './dto/create-indicator-per-recopilation.dto'
import { UpdateIndicatorPerRecopilationDto } from './dto/update-indicator-per-recopilation.dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { Indicator } from '../indicators/entities/indicator.entity'
import { Recopilation } from '../recopilations/entities/recopilation.entity'

@Injectable()
export class IndicatorsPerRecopilationsService {
  constructor(
    @InjectRepository(IndicatorPerRecopilation)
    private readonly indicatorsPerRecopilationsRepository: Repository<IndicatorPerRecopilation>,
    @InjectRepository(Indicator)
    private readonly indicatorRepository: Repository<Indicator>,
    @InjectRepository(Recopilation)
    private readonly recopilationRepository: Repository<Recopilation>
  ) {}

  async findAll({ page, itemsPerPage }: PaginationParams): Promise<{
    indicatorsPerRecopilations: IndicatorPerRecopilation[]
    count: number
  }> {
    const [indicatorsPerRecopilations, count] =
      await this.indicatorsPerRecopilationsRepository.findAndCount({
        take: Number(itemsPerPage),
        skip: (Number(page) - 1) * Number(itemsPerPage),
        relations: ['recopilation', 'indicator']
      })

    return { indicatorsPerRecopilations, count }
  }

  async findOne(id: number): Promise<IndicatorPerRecopilation> {
    return this.indicatorsPerRecopilationsRepository.findOneOrFail({
      where: { id },
      relations: ['recopilation', 'indicator']
    })
  }

  async create(
    createIndicatorsPerRecopilationsDto: CreateIndicatorPerRecopilationDto
  ): Promise<IndicatorPerRecopilation> {
    const { recopilationId: IDRecopilacion, indicatorIndex: IndiceIndicador } =
      createIndicatorsPerRecopilationsDto

    const recopilation = await this.recopilationRepository.findOneByOrFail({
      id: IDRecopilacion
    })
    const indicator = await this.indicatorRepository.findOneByOrFail({
      index: IndiceIndicador
    })

    const indicatorsPerRecopilations =
      this.indicatorsPerRecopilationsRepository.create({
        recopilation,
        indicator
      })

    return this.indicatorsPerRecopilationsRepository.save(
      indicatorsPerRecopilations
    )
  }

  async update(
    id: number,
    updateIndicatorsPerRecopilationsDto: UpdateIndicatorPerRecopilationDto
  ): Promise<IndicatorPerRecopilation> {
    const indicatorsPerRecopilations =
      await this.indicatorsPerRecopilationsRepository.findOneOrFail({
        where: { id },
        relations: ['recopilation', 'indicator']
      })

    const { recopilationId: IDRecopilacion, indicatorIndex: IndiceIndicador } =
      updateIndicatorsPerRecopilationsDto

    const recopilation = await this.recopilationRepository.findOneByOrFail({
      id: IDRecopilacion
    })
    indicatorsPerRecopilations.recopilation = recopilation

    const indicator = await this.indicatorRepository.findOneByOrFail({
      index: IndiceIndicador
    })
    indicatorsPerRecopilations.indicator = indicator

    await this.indicatorsPerRecopilationsRepository.save(
      indicatorsPerRecopilations
    )

    return this.indicatorsPerRecopilationsRepository.findOneOrFail({
      where: { id },
      relations: ['recopilation', 'indicator']
    })
  }

  async remove(id: number): Promise<void> {
    const indicatorsPerRecopilations =
      await this.indicatorsPerRecopilationsRepository.findOneOrFail({
        where: { id },
        relations: ['recopilation', 'indicator']
      })
    await this.indicatorsPerRecopilationsRepository.remove(
      indicatorsPerRecopilations
    )
  }
}
