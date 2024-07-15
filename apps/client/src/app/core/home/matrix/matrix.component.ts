import { Component, Input } from '@angular/core'
import { Answer, MatrixInfoDto } from '../../../services/recopilation.service'
import { TableModule } from 'primeng/table'
import { TooltipModule } from 'primeng/tooltip'
import { TooltipIcon } from '../../../common/tooltip-icon/tooltip-icon.component'
import { ButtonModule } from 'primeng/button'
import { CustomTdComponent } from './custom-td/custom-td.component'

@Component({
  selector: 'app-matrix',
  standalone: true,
  imports: [
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
  @Input() matrixData: MatrixInfoDto | null = null
  @Input() matrixScrollHeight: string = '60vh'

  getAnswer(answers: Answer[], categoryId: number): Answer | undefined {
    return answers.find((item) => item.categoryId === categoryId)
  }

  getLink() {}
}
