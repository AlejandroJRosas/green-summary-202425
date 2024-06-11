import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DepartmentPerRecopilation } from '../departments-per-recopilations/entities/departments-per-recopilation.entity'
import { Repository } from 'typeorm'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { OrderByParamDto } from './dto/order-users-by-param.dto'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { Department } from './entities/department.entity'
import { parseFiltersToTypeOrm } from 'src/shared/filtering/parse-filters-to-type-orm'

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentsRepository: Repository<Department>,
    @InjectRepository(DepartmentPerRecopilation)
    private readonly departmentsPerRecopilationRepository: Repository<DepartmentPerRecopilation>
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
    const [departments, count] = await this.departmentsRepository.findAndCount({
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
      order: { [orderBy]: orderType },
      where: parseFiltersToTypeOrm(filters)
    })

    return { departments, count }
  }

  async findOne(id: number) {
    const department = await this.departmentsRepository.findOneByOrFail({ id })

    return department
  }

  async departmentsByRecopilation(recopilationId: number) {
    const departmentsPerRecopilation =
      await this.departmentsPerRecopilationRepository.find({
        where: { department: { id: recopilationId } },
        relations: ['department']
      })

    return departmentsPerRecopilation.map((dpr) => dpr.department)
  }
}
