import { Component, Input } from '@angular/core'
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
export class MatrixComponent {
  @Input() selectedRecopilation: number = 0
  @Input() matrixData: MatrixInfoDto | undefined
  @Input() matrixScrollHeight: string = '60vh'

  currentUser: User = JSON.parse(localStorage.getItem('user')!)

  getAnswer(answers: Answer[], categoryId: number): Answer | undefined {
    return answers.find((item) => item.categoryId === categoryId)
  }
}
