import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  ValidateNested
} from 'class-validator'
import { Type } from 'class-transformer'

export class RecommendCategoriesDto {
  @IsNumber()
  @IsNotEmpty()
  recopilationId: number

  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @IsArray()
  @IsNotEmpty()
  @Type(() => DepartmentToBeRecommended)
  departments: DepartmentToBeRecommended[]
}

export class DepartmentToBeRecommended {
  @IsNumber()
  @IsNotEmpty()
  departmentId: number

  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @IsArray()
  @IsNotEmpty()
  @Type(() => CategoryToRecommend)
  categories: CategoryToRecommend[]
}

export class CategoryToRecommend {
  @IsNumber()
  @IsNotEmpty()
  categoryId: number
}
