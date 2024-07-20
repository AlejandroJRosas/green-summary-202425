import { Component, Input } from '@angular/core'
import { TooltipModule } from 'primeng/tooltip'

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [TooltipModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() title: string = ''
  @Input() mainText: string = ''
}
