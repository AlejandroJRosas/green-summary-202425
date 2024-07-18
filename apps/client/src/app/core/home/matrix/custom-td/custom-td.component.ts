import { Component, Input } from '@angular/core'
import { Answer } from '../../../../services/recopilation.service'
import { CommonModule } from '@angular/common'
import { TooltipIcon } from '../../../../common/tooltip-icon/tooltip-icon.component'
import { User } from '../../../../../shared/types/user.type'

@Component({
  selector: 'custom-td',
  standalone: true,
  imports: [CommonModule, TooltipIcon],
  templateUrl: './custom-td.component.html',
  styleUrl: './custom-td.component.css'
})
export class CustomTdComponent {
  @Input() answer: Answer | undefined
  @Input() selectedRecopilation: number | undefined
  @Input() departmentId: number | undefined

  user: User = JSON.parse(localStorage.getItem('user')!)

  getLink(): string {
    if (this.user.type === 'department') {
      if (this.user.id === this.departmentId) {
        return `pages/information-collection/recopilation/${this.selectedRecopilation}/category/${this.answer?.categoryId}`
      }
      return ''
    }

    return `pages/view/information-collection/recopilation/${this.selectedRecopilation}/category/${this.answer?.categoryId}/department/${this.departmentId}`
  }
}
