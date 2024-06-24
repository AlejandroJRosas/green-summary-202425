import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityNotFoundError, In, Repository } from 'typeorm'
import { DepartmentPerRecopilation } from './entities/departments-per-recopilation.entity'
import { CreateDepartmentsPerRecopilationDto } from './dto/create-department-per-recopilation.dto'
import { UpdateDepartmentPerRecopilationDto } from './dto/update-department-per-recopilation.dto'
import { PaginationParams } from 'src/shared/pagination/pagination-params.dto'
import { Recopilation } from 'src/core/recopilations/entities/recopilation.entity'
import { Department } from '../users/entities/department.entity'
import { FiltersSegmentDto } from 'src/shared/filtering/filters-segment.dto'
import { parseFiltersToTypeOrm } from 'src/shared/filtering/parse-filters-to-type-orm'
import { OrderTypeParamDto } from 'src/shared/sorting/order-type-param.dto'
import { OrderByParamDto } from './dto/order-departments-per-recopilations-by-param.dto'

@Injectable()
export class DepartmentsPerRecopilationsService {
  constructor(
    @InjectRepository(DepartmentPerRecopilation)
    private readonly departmentsPerRecopilationRepository: Repository<DepartmentPerRecopilation>,
    @InjectRepository(Recopilation)
    private readonly recopilationRepository: Repository<Recopilation>,
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>
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
    const [departmentsPerRecopilations, count] =
      await this.departmentsPerRecopilationRepository.findAndCount({
        take: Number(itemsPerPage),
        skip: (Number(page) - 1) * Number(itemsPerPage),
        relations: ['recopilation', 'department'],
        order: { [orderBy]: orderType },
        where: parseFiltersToTypeOrm(filters)
      })

    return { departmentsPerRecopilations, count }
  }

  async findOne(id: number): Promise<DepartmentPerRecopilation> {
    try {
      return await this.departmentsPerRecopilationRepository.findOneOrFail({
        where: { id },
        relations: ['recopilation', 'department']
      })
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(
          `La relación entre recopilación y departamento con ID ${id} no fue encontrada.`
        )
      }
      throw error
    }
  }

  async set(
    createDepartmentsPerRecopilationDto: CreateDepartmentsPerRecopilationDto
  ): Promise<DepartmentPerRecopilation[]> {
    const { recopilationId, departmentsIds } =
      createDepartmentsPerRecopilationDto

    const recopilation = await this.recopilationRepository.findOneByOrFail({
      id: recopilationId
    })
    const departments = await this.departmentRepository.findBy({
      id: In(departmentsIds)
    })

    if (departments.length !== departmentsIds.length) {
      throw new NotFoundException('Uno o más departamentos no se encontraron.')
    }

    const existingEntries =
      await this.departmentsPerRecopilationRepository.find({
        where: {
          recopilation: { id: recopilationId },
          department: In(departmentsIds)
        }
      })

    if (existingEntries.length > 0) {
      throw new ConflictException(
        'Ya existe una relación entre la recopilación y uno o más de los departamentos proporcionados.'
      )
    }

    await this.departmentsPerRecopilationRepository.delete({
      recopilation: { id: recopilationId }
    })

    return await this.departmentsPerRecopilationRepository.save(
      departments.map((d) =>
        this.departmentsPerRecopilationRepository.create({
          recopilation,
          department: d
        })
      )
    )
  }

  async update(
    id: number,
    updateDepartmentsPerRecopilationDto: UpdateDepartmentPerRecopilationDto
  ): Promise<DepartmentPerRecopilation> {
    let departmentPerRecopilationToUpdate: DepartmentPerRecopilation
    try {
      departmentPerRecopilationToUpdate =
        await this.departmentsPerRecopilationRepository.findOneOrFail({
          where: { id },
          relations: ['recopilation', 'department']
        })
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(
          `La relación entre recopilación y departamento con ID ${id} no fue encontrada.`
        )
      }
      throw error // Propagar otros tipos de errores que podrían surgir
    }

    const { recopilationId, departmentsIds: departmentId } =
      updateDepartmentsPerRecopilationDto

    const recopilation = await this.recopilationRepository.findOneByOrFail({
      id: recopilationId
    })
    departmentPerRecopilationToUpdate.recopilation = recopilation

    const department = await this.departmentRepository.findOneByOrFail({
      id: departmentId
    })
    departmentPerRecopilationToUpdate.department = department

    const existingEntry =
      await this.departmentsPerRecopilationRepository.findOne({
        where: {
          recopilation: { id: recopilationId },
          department: { id: departmentId }
        }
      })

    if (existingEntry && existingEntry.id !== id) {
      throw new ConflictException(
        'Ya existe una relación entre la recopilación y el departamento proporcionado.'
      )
    }

    await this.departmentsPerRecopilationRepository.save(
      departmentPerRecopilationToUpdate
    )

    return this.departmentsPerRecopilationRepository.findOneOrFail({
      where: { id },
      relations: ['recopilation', 'department']
    })
  }

  async remove(id: number): Promise<void> {
    try {
      const departmentsPerRecopilation =
        await this.departmentsPerRecopilationRepository.findOneOrFail({
          where: { id },
          relations: ['recopilation', 'department']
        })
      await this.departmentsPerRecopilationRepository.remove(
        departmentsPerRecopilation
      )
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(
          `La relación entre recopilación y departamento con ID ${id} no fue encontrada y no se pudo eliminar.`
        )
      }
      throw error // Propagar otros tipos de errores que podrían surgir
    }
  }
}
