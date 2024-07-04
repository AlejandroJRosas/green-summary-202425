import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { TooltipModule } from 'primeng/tooltip'

@Component({
  selector: 'tooltip-icon',
  standalone: true,
  imports: [CommonModule, TooltipModule],
  templateUrl: './tooltip-icon.component.html',
  styleUrl: './tooltip-icon.component.css'
})
export class TooltipIcon {
  @Input() icon: string = ''
  @Input() tooltip: string = ''
  @Input() size: 'small' | 'medium' | 'large' = 'medium'
}
