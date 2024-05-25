import { Module } from '@nestjs/common'
import { DepartmentsPerRecopilationsService } from './departments_per_recopilations.service'
import { DepartmentsPerRecopilationsController } from './departments_per_recopilations.controller'
import { Department } from '../users/entities/department.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DepartmentsPerRecopilation } from './entities/departments_per_recopilation.entity'
import { Recopilation } from '../recopilations/entities/recopilation.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DepartmentsPerRecopilation,
      Department,
      Recopilation
    ])
  ],
  controllers: [DepartmentsPerRecopilationsController],
  providers: [DepartmentsPerRecopilationsService]
})
export class DepartmentsPerRecopilationsModule {}
