import { Component, Input } from '@angular/core'
import { Answer } from '../../../../services/recopilation.service'
import { TooltipIcon } from '../../../../common/tooltip-icon/tooltip-icon.component'
import { User } from '../../../../../shared/types/user.type'

@Component({
  selector: 'custom-td',
  standalone: true,
  imports: [TooltipIcon],
  templateUrl: './custom-td.component.html',
  styleUrl: './custom-td.component.css'
})
export class CustomTdComponent {
  @Input() answer: Answer | undefined
  @Input() selectedRecopilation: number | undefined
  @Input() departmentId: number | undefined

  getLink(): string {
    const localUserString = localStorage.getItem('user')
    if (!localUserString) {
      return 'login'
    }
    const user: User = JSON.parse(localUserString)

    if (user.type === 'department') {
      if (user.id === this.departmentId) {
        return `pages/information-collection/recopilation/${this.selectedRecopilation}/category/${this.answer?.categoryId}`
      }
      return ''
    }

    return `pages/view/information-collection/recopilation/${this.selectedRecopilation}/category/${this.answer?.categoryId}/department/${this.departmentId}`
  }
}
