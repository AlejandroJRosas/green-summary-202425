import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityNotFoundError, Repository } from 'typeorm'
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
    try {
      return this.indicatorsPerRecopilationsRepository.findOneOrFail({
        where: { id },
        relations: ['recopilation', 'indicator']
      })
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(
          `La relación entre recopilación e indicador con ID ${id} no fue encontrada.`
        )
      }
      throw error // Propaga otros tipos de errores
    }
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

    // Verificar si ya existe una relación con el mismo recopilationId e indicatorIndex
    const existingRelation =
      await this.indicatorsPerRecopilationsRepository.findOne({
        where: {
          recopilation: { id: IDRecopilacion },
          indicator: { index: IndiceIndicador }
        }
      })

    if (existingRelation) {
      throw new ConflictException(
        `Ya existe una relación entre la recopilación ${IDRecopilacion} y el indicador ${IndiceIndicador}.`
      )
    }

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
    updateDto: UpdateIndicatorPerRecopilationDto
  ): Promise<IndicatorPerRecopilation> {
    const { recopilationId, indicatorIndex } = updateDto

    let relationToUpdate: IndicatorPerRecopilation
    try {
      relationToUpdate =
        await this.indicatorsPerRecopilationsRepository.findOneOrFail({
          where: { id },
          relations: ['recopilation', 'indicator']
        })
    } catch (error) {
      throw new NotFoundException(
        `No se encontró el indicador per recopilación con el ID ${id}`
      )
    }

    const recopilation = await this.recopilationRepository.findOneByOrFail({
      id: recopilationId
    })

    // Verificar si ya existe otra relación con el mismo recopilationId e indicatorIndex
    const existingRelation =
      await this.indicatorsPerRecopilationsRepository.findOne({
        where: {
          recopilation: { id: recopilationId },
          indicator: { index: indicatorIndex }
        }
      })

    if (existingRelation) {
      throw new ConflictException(
        `Ya existe otra relación entre la recopilación ${recopilationId} y el indicador ${indicatorIndex}.`
      )
    }

    relationToUpdate.recopilation = recopilation

    const indicator = await this.indicatorRepository.findOneByOrFail({
      index: indicatorIndex
    })
    relationToUpdate.indicator = indicator

    await this.indicatorsPerRecopilationsRepository.save(relationToUpdate)

    return await this.indicatorsPerRecopilationsRepository.findOneOrFail({
      where: { id },
      relations: ['recopilation', 'indicator']
    })
  }

  async remove(id: number): Promise<void> {
    try {
      const indicatorsPerRecopilations =
        await this.indicatorsPerRecopilationsRepository.findOneOrFail({
          where: { id },
          relations: ['recopilation', 'indicator']
        })
      await this.indicatorsPerRecopilationsRepository.remove(
        indicatorsPerRecopilations
      )
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(
          `La relación entre recopilación e indicador con ID ${id} no fue encontrada y no se pudo eliminar.`
        )
      }
      throw error // Propaga otros tipos de errores
    }
  }
}
