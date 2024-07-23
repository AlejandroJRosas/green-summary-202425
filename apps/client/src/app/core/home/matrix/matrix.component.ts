import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core'
import { Answer, MatrixInfoDto } from '../../../services/recopilation.service'
import { TableModule } from 'primeng/table'
import { TooltipModule } from 'primeng/tooltip'
import { TooltipIcon } from '../../../common/tooltip-icon/tooltip-icon.component'
import { ButtonModule } from 'primeng/button'
import { CustomTdComponent } from './custom-td/custom-td.component'
import { CommonModule } from '@angular/common'
import { User } from '../../../../shared/types/user.type'

@Component({
  selector: 'app-matrix',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TooltipModule,
    TooltipIcon,
    ButtonModule,
    CustomTdComponent
  ],
  templateUrl: './matrix.component.html',
  styleUrl: './matrix.component.css'
})
export class MatrixComponent implements OnInit, OnChanges {
  @Input() selectedRecopilation: number = 0
  @Input() matrixData: MatrixInfoDto | undefined
  @Input() matrixScrollHeight: string = '60vh'

  departmentsExtraInfo: ExtraInfo = {
    totalRecommendedQuantity: 0,
    totalRecommendedAnswers: 0,
    totalFreeQuantity: 0,
    totalFreeAnswers: 0,
    totalQuantity: 0,
    totalAnswers: 0,
    departments: []
  }

  totalDepartments: number = 0
  currentUser: User = JSON.parse(localStorage.getItem('user')!)

  stats: IndicatorsStats[] = []

  ngOnInit(): void {
    this.totalDepartments = this.matrixData?.departments.length || 0
    this.getStats()
    this.loadExtraInfo()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['matrixData']) {
      this.totalDepartments = this.matrixData?.departments.length || 0
      this.getStats()
      this.loadExtraInfo()
    }
  }

  getAnswer(answers: Answer[], categoryId: number): Answer | undefined {
    return answers.find((item) => item.categoryId === categoryId)
  }

  getStats() {
    this.stats = []

    if (!this.matrixData) {
      return
    }

    this.matrixData.indicators.forEach((indicator, indicatorIndex) => {
      this.stats.push({
        indicatorId: indicator.index,
        freeQuantity: 0,
        freeAnswersQuantity: 0,
        recommendedQuantity: 0,
        recommendedAnswersQuantity: 0,
        categories: []
      })
      indicator.categories.forEach((category, categoryIndex) => {
        this.stats[indicatorIndex].categories.push({
          categoryId: category.id,
          freeQuantity: 0,
          freeAnswersQuantity: 0,
          recommendedQuantity: 0,
          recommendedAnswersQuantity: 0
        })
        this.matrixData?.departments.forEach((department) => {
          department.answers.forEach((answer) => {
            if (answer.categoryId === category.id) {
              if (answer.isAnswered || answer.isApproved) {
                if (answer.isRecommended) {
                  this.stats[indicatorIndex].recommendedQuantity++
                  this.stats[indicatorIndex].recommendedAnswersQuantity++
                  this.stats[indicatorIndex].categories[categoryIndex]
                    .recommendedQuantity++
                  this.stats[indicatorIndex].categories[categoryIndex]
                    .recommendedAnswersQuantity++
                } else {
                  this.stats[indicatorIndex].freeQuantity++
                  this.stats[indicatorIndex].freeAnswersQuantity++
                  this.stats[indicatorIndex].categories[categoryIndex]
                    .freeQuantity++
                  this.stats[indicatorIndex].categories[categoryIndex]
                    .freeAnswersQuantity++
                }
              } else {
                if (answer.isRecommended) {
                  this.stats[indicatorIndex].recommendedQuantity++
                  this.stats[indicatorIndex].categories[categoryIndex]
                    .recommendedQuantity++
                } else {
                  this.stats[indicatorIndex].freeQuantity++
                  this.stats[indicatorIndex].categories[categoryIndex]
                    .freeQuantity++
                }
              }
            }
          })
        })
      })
    })
  }

  loadExtraInfo() {
    if (!this.matrixData) return
    this.departmentsExtraInfo.departments = this.matrixData.departments.map(
      (department) => {
        return {
          id: department.department.id,
          name: department.department.fullName,
          recommendedQuantity: department.answers.filter(
            (item) => item.isRecommended === true
          ).length,
          recommendedAnswers: department.answers.filter(
            (item) => item.isRecommended === true && item.isAnswered === true
          ).length,
          freeQuantity: department.answers.filter(
            (item) => item.isRecommended === false
          ).length,
          freeAnswers: department.answers.filter(
            (item) => item.isRecommended === false && item.isAnswered === true
          ).length,
          quantity: department.answers.length,
          answers: department.answers.filter((item) => item.isAnswered === true)
            .length
        }
      }
    )

    this.departmentsExtraInfo.totalRecommendedAnswers =
      this.departmentsExtraInfo.departments.reduce(
        (acc, item) => acc + item.recommendedAnswers,
        0
      )
    this.departmentsExtraInfo.totalFreeAnswers =
      this.departmentsExtraInfo.departments.reduce(
        (acc, item) => acc + item.freeAnswers,
        0
      )
    this.departmentsExtraInfo.totalRecommendedQuantity =
      this.departmentsExtraInfo.departments.reduce(
        (acc, item) => acc + item.recommendedQuantity,
        0
      )
    this.departmentsExtraInfo.totalFreeQuantity =
      this.departmentsExtraInfo.departments.reduce(
        (acc, item) => acc + item.freeQuantity,
        0
      )
    this.departmentsExtraInfo.totalQuantity =
      this.departmentsExtraInfo.totalRecommendedQuantity +
      this.departmentsExtraInfo.totalFreeQuantity

    this.departmentsExtraInfo.totalAnswers =
      this.departmentsExtraInfo.totalRecommendedAnswers +
      this.departmentsExtraInfo.totalFreeAnswers
  }

  getDepartmentTooltipStats(departmentId: number): string {
    const department = this.departmentsExtraInfo.departments.find(
      (department) => department.id == departmentId
    )

    if (department) {
      return `Respuestas:
        Recomendadas: ${department.recommendedAnswers}/${department.recommendedQuantity}
        Total: ${department.answers}/${department.quantity}
      `
    }

    return 'Departamento no encontrado'
  }

  getIndicatorTooltipStats(indicatorId: number): string {
    const response = this.stats.find((stat) => stat.indicatorId === indicatorId)

    if (response) {
      return `Respuestas:
        Recomendadas: ${response.recommendedAnswersQuantity}/${response.recommendedQuantity}
        Total: ${response.freeAnswersQuantity + response.recommendedAnswersQuantity}/${response.freeAnswersQuantity + response.recommendedAnswersQuantity + response.freeQuantity + response.recommendedQuantity}
      `
    }

    return 'Indicador no encontrado'
  }

  getCategoryTooltipStats(categoryId: number): string {
    for (const stat of this.stats) {
      const category = stat.categories.find(
        (category) => category.categoryId === categoryId
      )
      if (category) {
        return `Respuestas:
          Recomendadas: ${category.recommendedAnswersQuantity}/${category.recommendedQuantity}
          Total: ${category.freeAnswersQuantity + category.recommendedAnswersQuantity}/${category.freeAnswersQuantity + category.recommendedAnswersQuantity + category.freeQuantity + category.recommendedQuantity}
        `
      }
    }
    return 'Categoría no encontrada'
  }
}

export interface IndicatorsStats {
  indicatorId: number
  freeAnswersQuantity: number
  freeQuantity: number
  recommendedAnswersQuantity: number
  recommendedQuantity: number
  categories: CategoryStats[]
}

interface CategoryStats {
  categoryId: number
  freeAnswersQuantity: number
  freeQuantity: number
  recommendedAnswersQuantity: number
  recommendedQuantity: number
}

interface ExtraInfo {
  totalRecommendedQuantity: number
  totalRecommendedAnswers: number
  totalFreeQuantity: number
  totalFreeAnswers: number
  totalQuantity: number
  totalAnswers: number
  departments: DepartmentExtraInfo[]
}

interface DepartmentExtraInfo {
  id: number
  name: string
  recommendedQuantity: number
  recommendedAnswers: number
  freeQuantity: number
  freeAnswers: number
  quantity: number
  answers: number
}
