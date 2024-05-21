import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Recommend } from './entities/recommend.entity'
import { CreateRecommendDto } from './dto/create-recommend.dto'
import { UpdateRecommendDto } from './dto/update-recommend.dto'
import { User } from 'src/core/users/entities/user.entity'
import { Category } from 'src/core/categories/entities/category.entity'
import { UserTypes } from '../users/constants'

@Injectable()
export class RecommendService {
  constructor(
    @InjectRepository(Recommend)
    private readonly recommendRepository: Repository<Recommend>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async create(createRecommendDto: CreateRecommendDto): Promise<Recommend> {
    const { IDDepartamento, IDCategoria } = createRecommendDto

    const departamento = await this.userRepository.findOneOrFail({
      where: { id: IDDepartamento, type: UserTypes.DEPARTMENT }
    })
    const categoria = await this.categoryRepository.findOneOrFail({
      where: { id: IDCategoria }
    })

    const recommend = new Recommend()
    recommend.IDDepartamento = IDDepartamento
    recommend.IDCategoria = IDCategoria
    recommend.departamento = departamento
    recommend.categoria = categoria

    return this.recommendRepository.save(recommend)
  }

  findAll(): Promise<Recommend[]> {
    return this.recommendRepository.find({
      relations: ['departamento', 'categoria']
    })
  }

  findOne(IDDepartamento: number, IDCategoria: number): Promise<Recommend> {
    return this.recommendRepository.findOne({
      where: { IDDepartamento, IDCategoria },
      relations: ['departamento', 'categoria']
    })
  }

  async update(
    IDDepartamento: number,
    IDCategoria: number,
    updateRecommendDto: UpdateRecommendDto
  ): Promise<Recommend> {
    const recommend = await this.recommendRepository.findOneOrFail({
      where: { IDDepartamento, IDCategoria }
    })
    if (!recommend) {
      throw new NotFoundException('Recommendation not found')
    }

    Object.assign(recommend, updateRecommendDto)
    return this.recommendRepository.save(recommend)
  }

  async remove(IDDepartamento: number, IDCategoria: number): Promise<void> {
    const recommend = await this.recommendRepository.findOne({
      where: { IDDepartamento, IDCategoria }
    })
    if (!recommend) {
      throw new NotFoundException('Recommendation not found')
    }

    await this.recommendRepository.remove(recommend)
  }
}
