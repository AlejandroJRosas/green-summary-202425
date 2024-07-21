import { Component, Input } from '@angular/core'
import {
  Answer,
  MatrixInfoDto
} from '../../../../../../../services/recopilation.service'
import { CommonModule } from '@angular/common'
import { TooltipIcon } from '../../../../../../../common/tooltip-icon/tooltip-icon.component'

@Component({
  selector: 'custom-td',
  standalone: true,
  imports: [CommonModule, TooltipIcon],
  templateUrl: './custom-td.component.html',
  styleUrl: './custom-td.component.css'
})
export class CustomTdComponent {
  @Input() answer: Answer | undefined
  @Input() departmentId: number = 0
  @Input() matrixData: MatrixInfoDto | undefined
  @Input() recopilationId: number = -1

  selectRecommendation() {
    console.log(
      'Nombre: ',
      this.matrixData?.departments.find(
        (d) => d.department.id === this.departmentId
      )?.department.fullName
    )
    console.log('Departamento: ', this.departmentId)
    console.log('Categoria: ', this.answer?.categoryId)

    this.matrixData?.departments.forEach((d) => {
      if (d.department.id === this.departmentId) {
        d.answers.forEach((a) => {
          if (a.categoryId === this.answer?.categoryId) {
            a.isRecommended = !a.isRecommended
          }
        })
      }
    })
    console.log(
      'Recomendación: ',
      this.matrixData?.departments
        .find((department) => department.department.id === this.departmentId)
        ?.answers.find(
          (answer) => answer.categoryId === this.answer?.categoryId
        )?.isRecommended
    )
  }
}
