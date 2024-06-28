import { Category } from 'src/core/categories/entities/category.entity'
import { Criteria } from 'src/core/criterion/entities/criteria.entity'
import { Indicator } from 'src/core/indicators/entities/indicator.entity'
import { Department } from 'src/core/users/entities/department.entity'

export interface RecopilationDto {
  id: number
  name: string
  description: string
  startDate: Date
  endDate: Date
  departmentEndDate: Date
  isReady: boolean
  departments: {
    department: Department
    recommendedCategories: Category[]
  }[]
  indicators: {
    indicator: Indicator
    criteria: {
      criterion: Criteria
      category: Category
    }[]
  }[]
}
