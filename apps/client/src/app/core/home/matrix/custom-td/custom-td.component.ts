import { Component, Input } from '@angular/core'
import { Answer } from '../../../../services/recopilation.service'
import { TooltipIcon } from '../../../../common/tooltip-icon/tooltip-icon.component'

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
}
