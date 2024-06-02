import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Answer } from '../answers/entities/answer.entity'
import { CreateAnswerDto } from '../answers/dto/create-answer.dto'
import { UpdateAnswerDto } from '../answers/dto/update-answer.dto'
import { Recopilation } from '../recopilations/entities/recopilation.entity'
import { Department } from '../users/entities/department.entity'
import { Category } from '../categories/entities/category.entity'
import { InformationCollection } from '../information-collections/entities/information-collection.entity'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { parseFiltersToTypeOrm } from 'src/shared/filtering/parse-filters-to-type-orm'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-anwsers-by-param.dto'

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private readonly answersRepository: Repository<Answer>,
    @InjectRepository(Recopilation)
    private readonly recopilationRepository: Repository<Recopilation>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(InformationCollection)
    private readonly informationCollectionRepository: Repository<InformationCollection>
  ) {}

  async findAll({
    page,
    itemsPerPage,
    orderBy,
    orderType,
    filters
  }: PaginationParams &
    OrderByParamDto &
    OrderTypeParamDto &
    FiltersSegmentDto) {
    const [answers, count] = await this.answersRepository.findAndCount({
      take: Number(itemsPerPage),
      skip: (Number(page) - 1) * Number(itemsPerPage),
      relations: [
        'recopilation',
        'department',
        'category',
        'informationCollection'
      ],
      order: { [orderBy]: orderType },
      where: parseFiltersToTypeOrm(filters)
    })

    return { answers, count }
  }

  async findOne(id: number): Promise<Answer> {
    return await this.answersRepository.findOneOrFail({
      where: { id },
      relations: [
        'recopilation',
        'department',
        'category',
        'informationCollection'
      ]
    })
  }

  async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const {
      recopilationId,
      departmentId,
      categoryId,
      informationCollectionId
    } = createAnswerDto

    const recopilation = await this.recopilationRepository.findOneByOrFail({
      id: recopilationId
    })
    const department = await this.departmentRepository.findOneByOrFail({
      id: departmentId
    })
    const category = await this.categoryRepository.findOneByOrFail({
      id: categoryId
    })
    const informationCollection =
      await this.informationCollectionRepository.findOneByOrFail({
        id: informationCollectionId
      })

    const answer = this.answersRepository.create({
      recopilation,
      department,
      category,
      informationCollection
    })
    return this.answersRepository.save(answer)
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto): Promise<Answer> {
    const answer = await this.findOne(id)

    const {
      recopilationId,
      departmentId,
      categoryId,
      informationCollectionId
    } = updateAnswerDto

    const recopilation = await this.recopilationRepository.findOneByOrFail({
      id: recopilationId
    })
    answer.recopilation = recopilation

    const department = await this.departmentRepository.findOneByOrFail({
      id: departmentId
    })
    answer.department = department

    const category = await this.categoryRepository.findOneByOrFail({
      id: categoryId
    })
    answer.category = category

    const collection =
      await this.informationCollectionRepository.findOneByOrFail({
        id: informationCollectionId
      })
    answer.informationCollection = collection

    await this.answersRepository.save(answer)

    return await this.answersRepository.findOneOrFail({
      where: { id },
      relations: [
        'recopilation',
        'department',
        'category',
        'informationCollection'
      ]
    })
  }

  async remove(id: number): Promise<void> {
    const answer = await this.findOne(id)
    await this.answersRepository.remove(answer)
  }
}
