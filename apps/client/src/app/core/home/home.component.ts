import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { DropdownModule } from 'primeng/dropdown'
import { TableModule } from 'primeng/table'
import { RecopilationService } from '../../services/recopilation.service'
import { Recopilation } from '../../../shared/types/recopilation.type'
import { Department } from '../../../shared/types/user.type'
import { Category } from '../../../shared/types/category.type'
import { Indicator } from '../../../shared/types/indicator.type'
import { Criteria } from '../../../shared/types/criterion.type'
import { TooltipIcon } from '../../common/tooltip-icon/tooltip-icon.component'
import { TooltipModule } from 'primeng/tooltip'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    DropdownModule,
    TableModule,
    TooltipIcon,
    TooltipModule,
    RouterLink
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  constructor(private recopilationService: RecopilationService) {}

  recopilations: Recopilation[] = []
  selectedRecopilation: number = 0
  matrixData: MatrixData | null = null

  ngOnInit(): void {
    this.getActiveRecopilations()
  }

  getActiveRecopilations() {
    this.recopilationService.getActive().subscribe({
      next: (recopilations) => {
        if (recopilations.status === 'success') {
          this.recopilations = recopilations.data
          console.log(recopilations.data)
        }
      }
    })
  }

  getMatrixData() {
    if (this.selectedRecopilation) {
      this.recopilationService.getById(this.selectedRecopilation).subscribe({
        next: (recopilation) => {
          if (recopilation) {
            this.matrixData = {
              id: recopilation.id,
              name: recopilation.name,
              description: recopilation.description,
              startDate: recopilation.startDate,
              endDate: recopilation.endDate,
              departmentEndDate: recopilation.departmentEndDate,
              isReady: recopilation.isReady,
              departments: recopilation.departments.map((department) => ({
                department: department.department,
                recommendedCategories: department.recommendedCategories
              })),
              indicators: recopilation.indicators.map((indicator) => ({
                indicator: indicator.indicator,
                categories: this.getCategoriesArray(
                  indicator.criteria.map((criterion) => criterion.category)
                ),
                criteria: indicator.criteria.map((criterion) => ({
                  criterion: criterion.criterion,
                  category: criterion.category
                }))
              }))
            }
          }
          console.log(this.matrixData)
        },
        error: (error) => {
          console.error(error)
        }
      })
    }
  }

  getCategoriesArray(categories: Category[]): Category[] {
    const categoriesArray: Category[] = []
    categories.forEach((category) => {
      if (!categoriesArray.some((item) => item.id === category.id)) {
        categoriesArray.push(category)
      }
    })

    return categoriesArray
  }

  isRecommended(recommendations: Category[], category: Category) {
    return recommendations.some((item) => item.id === category.id)
  }
}

interface MatrixData {
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
    categories: Category[]
    criteria: {
      criterion: Criteria
      category: Category
    }[]
  }[]
}
