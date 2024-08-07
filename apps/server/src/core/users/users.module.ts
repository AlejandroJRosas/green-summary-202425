import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Coordinator } from './entities/coordinator.entity'
import { Department } from './entities/department.entity'
import { Admin } from './entities/admin.entity'
import { DepartmentsService } from './departments.service'
import { DepartmentPerRecopilation } from '../departments-per-recopilations/entities/departments-per-recopilation.entity'
import { DepartmentsController } from './departments.controller'
import { MailsModule } from '../mails/mails.module'
import { MailsService } from '../mails/mails.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Admin,
      Coordinator,
      Department,
      DepartmentPerRecopilation
    ]),
    MailsModule
  ],
  controllers: [UsersController, DepartmentsController],
  providers: [UsersService, DepartmentsService, MailsService],
  exports: [TypeOrmModule]
})
export class UsersModule {}
