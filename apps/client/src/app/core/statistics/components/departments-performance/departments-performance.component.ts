import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core'
import { PanelModule } from 'primeng/panel'
import { MatrixInfoDto } from '../../../../services/recopilation.service'
import { TableModule } from 'primeng/table'
import { TooltipModule } from 'primeng/tooltip'

@Component({
  selector: 'app-departments-performance',
  standalone: true,
  imports: [PanelModule, TableModule, TooltipModule],
  templateUrl: './departments-performance.component.html',
  styleUrl: './departments-performance.component.css'
})
export class DepartmentsPerformanceComponent implements OnInit, OnChanges {
  @Input() matrixData: MatrixInfoDto | null = null
  departmentsExtraInfo: ExtraInfo = {
    totalRecommendedQuantity: 0,
    totalRecommendedAnswers: 0,
    totalFreeQuantity: 0,
    totalFreeAnswers: 0,
    totalQuantity: 0,
    totalAnswers: 0,
    departments: []
  }

  ngOnInit(): void {
    this.loadExtraInfo()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['matrixData']) {
      this.loadExtraInfo()
    }
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
