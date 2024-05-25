import { Module } from '@nestjs/common'
import { CategoriesPerRecopilationsService } from './categories_per_recopilations.service'
import { CategoriesPerRecopilationsController } from './categories_per_recopilations.controller'
import { Category } from '../categories/entities/category.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CategoriesPerRecopilation } from './entities/categories_per_recopilation.entity'
import { Recopilation } from '../recopilations/entities/recopilation.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoriesPerRecopilation,
      Category,
      Recopilation
    ])
  ],
  controllers: [CategoriesPerRecopilationsController],
  providers: [CategoriesPerRecopilationsService]
})
export class CategoriesPerRecopilationsModule {}
