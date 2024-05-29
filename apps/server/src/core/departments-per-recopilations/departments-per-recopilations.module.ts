import { Module } from '@nestjs/common'
import { DepartmentsPerRecopilationsService } from './departments-per-recopilations.service'
import { DepartmentsPerRecopilationsController } from './departments-per-recopilations.controller'
import { Department } from '../users/entities/department.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DepartmentPerRecopilation } from './entities/departments-per-recopilation.entity'
import { Recopilation } from '../recopilations/entities/recopilation.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DepartmentPerRecopilation,
      Department,
      Recopilation
    ])
  ],
  controllers: [DepartmentsPerRecopilationsController],
  providers: [DepartmentsPerRecopilationsService]
})
export class DepartmentsPerRecopilationsModule {}
