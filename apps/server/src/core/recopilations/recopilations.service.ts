import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Recopilation } from './entities/recopilation.entity'

@Injectable()
export class RecopilationsService {
  constructor(
    @InjectRepository(Recopilation)
    private recopilationsRepository: Repository<Recopilation>
  ) {}

  async findAll(): Promise<Recopilation[]> {
    return this.recopilationsRepository.find()
  }

  async findOne(id: number): Promise<Recopilation> {
    return this.recopilationsRepository.findOneByOrFail({ id })
  }

  async create(recopilationData: Partial<Recopilation>): Promise<Recopilation> {
    const recopilation = this.recopilationsRepository.create(recopilationData)
    return this.recopilationsRepository.save(recopilation)
  }

  async update(
    id: number,
    recopilationData: Partial<Recopilation>
  ): Promise<Recopilation> {
    const recopilation = await this.recopilationsRepository.findOneByOrFail({
      id
    })
    const updatedRecopilation = Object.assign(recopilation, recopilationData)
    return this.recopilationsRepository.save(updatedRecopilation)
  }

  async remove(id: number): Promise<void> {
    const recopilation = await this.recopilationsRepository.findOneByOrFail({
      id
    })
    await this.recopilationsRepository.remove([recopilation])
  }
}
