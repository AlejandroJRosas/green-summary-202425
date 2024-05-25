import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { IndicatorsPerRecopilations } from './entities/indicators_per_recopilation.entity'
import { CreateIndicatorsPerRecopilationDto } from './dto/create-indicators_per_recopilation.dto'
import { UpdateIndicatorsPerRecopilationDto } from './dto/update-indicators_per_recopilation.dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { Indicator } from '../indicators/entities/indicator.entity'
import { Recopilation } from '../recopilations/entities/recopilation.entity'

@Injectable()
export class IndicatorsPerRecopilationsService {
  constructor(
    @InjectRepository(IndicatorsPerRecopilations)
    private readonly indicatorsPerRecopilationsRepository: Repository<IndicatorsPerRecopilations>,
    @InjectRepository(Indicator)
    private readonly indicatorRepository: Repository<Indicator>,
    @InjectRepository(Recopilation)
    private readonly recopilationRepository: Repository<Recopilation>
  ) {}

  async findAll({ page, itemsPerPage }: PaginationParams): Promise<{
    indicatorsPerRecopilations: IndicatorsPerRecopilations[]
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

  async findOne(id: number): Promise<IndicatorsPerRecopilations> {
    return this.indicatorsPerRecopilationsRepository.findOneOrFail({
      where: { id },
      relations: ['recopilation', 'indicator']
    })
  }

  async create(
    createIndicatorsPerRecopilationsDto: CreateIndicatorsPerRecopilationDto
  ): Promise<IndicatorsPerRecopilations> {
    const { IDRecopilacion, IndiceIndicador } =
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
    updateIndicatorsPerRecopilationsDto: UpdateIndicatorsPerRecopilationDto
  ): Promise<IndicatorsPerRecopilations> {
    const indicatorsPerRecopilations =
      await this.indicatorsPerRecopilationsRepository.findOneOrFail({
        where: { id },
        relations: ['recopilation', 'indicator']
      })

    const { IDRecopilacion, IndiceIndicador } =
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
