import { Module } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CategoriesController } from './categories.controller'
import { Category } from './entities/category.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Indicator } from '../indicators/entities/indicator.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Category, Indicator])],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
