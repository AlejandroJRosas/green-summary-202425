import { Component, Input } from '@angular/core'
import { Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-records-generic-card',
  standalone: true,
  imports: [],
  templateUrl: './generic-card.component.html',
  styleUrl: './generic-card.component.css'
})
export class RecordsGenericCardComponent {
  @Input() text: string | undefined
  @Output() click = new EventEmitter<void>()

  emitClick(): void {
    this.click.emit()
  }
}
