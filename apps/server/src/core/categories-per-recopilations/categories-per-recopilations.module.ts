import { Module } from '@nestjs/common'
import { CategoriesPerRecopilationsService } from './categories-per-recopilations.service'
import { CategoriesPerRecopilationsController } from './categories-per-recopilations.controller'
import { Category } from '../categories/entities/category.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoryPerRecopilation } from './entities/category-per-recopilation.entity'
import { Recopilation } from '../recopilations/entities/recopilation.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryPerRecopilation, Category, Recopilation])
  ],
  controllers: [CategoriesPerRecopilationsController],
  providers: [CategoriesPerRecopilationsService]
})
export class CategoriesPerRecopilationsModule {}
