import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DepartmentsPerRecopilation } from './entities/departments_per_recopilation.entity'
import { CreateDepartmentsPerRecopilationDto } from './dto/create-departments_per_recopilation.dto'
import { UpdateDepartmentsPerRecopilationDto } from './dto/update-departments_per_recopilation.dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { Recopilation } from 'src/core/recopilations/entities/recopilation.entity'
import { Department } from '../users/entities/department.entity'

@Injectable()
export class DepartmentsPerRecopilationsService {
  constructor(
    @InjectRepository(DepartmentsPerRecopilation)
    private readonly departmentsPerRecopilationRepository: Repository<DepartmentsPerRecopilation>,
    @InjectRepository(Recopilation)
    private readonly recopilationRepository: Repository<Recopilation>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>
  ) {}

  async findAll({ page, itemsPerPage }: PaginationParams): Promise<{
    departmentsPerRecopilations: DepartmentsPerRecopilation[]
    count: number
  }> {
    const [departmentsPerRecopilations, count] =
      await this.departmentsPerRecopilationRepository.findAndCount({
        take: Number(itemsPerPage),
        skip: (Number(page) - 1) * Number(itemsPerPage),
        relations: ['recopilation', 'department']
      })

    return { departmentsPerRecopilations, count }
  }

  async findOne(id: number): Promise<DepartmentsPerRecopilation> {
    return this.departmentsPerRecopilationRepository.findOneOrFail({
      where: { id },
      relations: ['recopilation', 'department']
    })
  }

  async create(
    createDepartmentsPerRecopilationDto: CreateDepartmentsPerRecopilationDto
  ): Promise<DepartmentsPerRecopilation> {
    const { recopilationId, departmentId } = createDepartmentsPerRecopilationDto

    const recopilation = await this.recopilationRepository.findOneByOrFail({
      id: recopilationId
    })
    const department = await this.departmentRepository.findOneByOrFail({
      id: departmentId
    })

    const departmentsPerRecopilation =
      this.departmentsPerRecopilationRepository.create({
        recopilation,
        department
      })

    return this.departmentsPerRecopilationRepository.save(
      departmentsPerRecopilation
    )
  }

  async update(
    id: number,
    updateDepartmentsPerRecopilationDto: UpdateDepartmentsPerRecopilationDto
  ): Promise<DepartmentsPerRecopilation> {
    const departmentsPerRecopilation =
      await this.departmentsPerRecopilationRepository.findOneOrFail({
        where: { id },
        relations: ['recopilation', 'department']
      })

    const { recopilationId, departmentId } = updateDepartmentsPerRecopilationDto

    const recopilation = await this.recopilationRepository.findOneByOrFail({
      id: recopilationId
    })
    departmentsPerRecopilation.recopilation = recopilation

    const department = await this.departmentRepository.findOneByOrFail({
      id: departmentId
    })
    departmentsPerRecopilation.department = department

    await this.departmentsPerRecopilationRepository.save(
      departmentsPerRecopilation
    )

    return this.departmentsPerRecopilationRepository.findOneOrFail({
      where: { id },
      relations: ['recopilation', 'department']
    })
  }

  async remove(id: number): Promise<void> {
    const departmentsPerRecopilation =
      await this.departmentsPerRecopilationRepository.findOneOrFail({
        where: { id },
        relations: ['recopilation', 'department']
      })
    await this.departmentsPerRecopilationRepository.remove(
      departmentsPerRecopilation
    )
  }
}
