/* eslint-disable no-constant-binary-expression */
import { CommonModule } from '@angular/common'
import { Component, Inject, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { DropdownModule } from 'primeng/dropdown'
import { TableModule } from 'primeng/table'
import {
  MatrixInfoDto,
  RecopilationService
} from '../../services/recopilation.service'
import { Recopilation } from '../../../shared/types/recopilation.type'
import { TooltipIcon } from '../../common/tooltip-icon/tooltip-icon.component'
import { TooltipModule } from 'primeng/tooltip'
import { RouterLink } from '@angular/router'
import { MatrixComponent } from './matrix/matrix.component'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { Toast } from '../../common/toast/toast.component'
import { User } from '../../../shared/types/user.type'
import { PanelModule } from 'primeng/panel'
import { ScrollTopModule } from 'primeng/scrolltop'

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
    RouterLink,
    MatrixComponent,
    ButtonModule,
    DialogModule,
    PanelModule,
    ScrollTopModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(
    @Inject(Toast) private toast: Toast,
    private recopilationService: RecopilationService
  ) {}

  recopilations: Recopilation[] = []
  currentUser: User = JSON.parse(localStorage.getItem('user')!)
  selectedRecopilation: number =
    Number(localStorage.getItem('selectedRecopilation')) ?? 0
  matrixData: MatrixInfoDto | undefined
  dialogVisible: boolean = false
  dialogMatrixScrollHeight: string = 'calc(70vh - 1rem)'
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
    this.getActiveRecopilations()
  }

  getActiveRecopilations() {
    this.recopilationService.getActive().subscribe({
      next: (recopilations) => {
        if (recopilations.status === 'success') {
          this.recopilations = recopilations.data
          if (
            this.recopilations.length === 1 &&
            (this.selectedRecopilation === 0 ||
              this.recopilations.find(
                (recopilation) => recopilation.id === this.selectedRecopilation
              ) === undefined)
          ) {
            this.updateLocalSelectedRecopilation()
            this.selectedRecopilation = this.recopilations[0].id
            this.getMatrixData()
          } else if (
            this.selectedRecopilation !== 0 &&
            this.recopilations.find(
              (recopilation) => recopilation.id === this.selectedRecopilation
            ) !== undefined
          ) {
            this.getMatrixData()
          }
        }
      },
      error: (e) => {
        if (e.error.data.message) {
          this.toast.show('error', 'Error', e.error.data.message)
        } else {
          this.toast.show('error', 'Error', e.error.message)
        }
      }
    })
  }

  updateLocalSelectedRecopilation() {
    localStorage.removeItem('selectedRecopilation')
    localStorage.setItem(
      'selectedRecopilation',
      this.selectedRecopilation.toString()
    )
  }

  getMatrixData() {
    if (this.selectedRecopilation) {
      this.recopilationService
        .getMatrixInfo(this.selectedRecopilation)
        .subscribe({
          next: (recopilation) => {
            if (recopilation) {
              this.updateLocalSelectedRecopilation()
              if (this.currentUser.type === 'department') {
                const departmentIndex = recopilation.departments.findIndex(
                  (item) => item.department.id === this.currentUser.id
                )

                const selectedDepartment = recopilation.departments.splice(
                  departmentIndex,
                  1
                )[0]

                recopilation.departments.unshift(selectedDepartment)
              }

              this.departmentsExtraInfo.departments =
                recopilation.departments.map((department) => {
                  return {
                    id: department.department.id,
                    name: department.department.fullName,
                    recommendedQuantity: department.answers.filter(
                      (item) => item.isRecommended === true
                    ).length,
                    recommendedAnswers: department.answers.filter(
                      (item) =>
                        item.isRecommended === true && item.isAnswered === true
                    ).length,
                    freeQuantity: department.answers.filter(
                      (item) => item.isRecommended === false
                    ).length,
                    freeAnswers: department.answers.filter(
                      (item) =>
                        item.isRecommended === false && item.isAnswered === true
                    ).length,
                    quantity: department.answers.length,
                    answers: department.answers.filter(
                      (item) => item.isAnswered === true
                    ).length
                  }
                })

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

              this.matrixData = recopilation
            }
          },
          error: (e) => {
            if (e.error.data != null) {
              this.toast.show('error', 'Error', e.error.data.message)
            } else {
              this.toast.show('error', 'Error', e.error.message)
            }
          }
        })
    }
  }

  showDialog() {
    this.dialogMatrixScrollHeight = 'calc(70vh - 1rem)'
    this.dialogVisible = true
  }

  onMaximize() {
    if (this.dialogMatrixScrollHeight === 'calc(80vh - 1rem)') {
      this.dialogMatrixScrollHeight = 'calc(70vh - 1rem)'
    } else {
      this.dialogMatrixScrollHeight = 'calc(80vh - 1rem)'
    }
  }

  parseDate(date: string | undefined): string {
    if (date === undefined) {
      return ''
    }
    return new Date(date).toLocaleDateString('es-ES', {
      timeZone: 'UTC'
    })
  }
}

type ExtraInfo = {
  totalRecommendedQuantity: number
  totalRecommendedAnswers: number
  totalFreeQuantity: number
  totalFreeAnswers: number
  totalQuantity: number
  totalAnswers: number
  departments: DepartmentExtraInfo[]
}

type DepartmentExtraInfo = {
  id: number
  name: string
  recommendedQuantity: number
  recommendedAnswers: number
  freeQuantity: number
  freeAnswers: number
  quantity: number
  answers: number
}
