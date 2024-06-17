import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { DropdownModule } from 'primeng/dropdown'
import { TableModule } from 'primeng/table'

interface Recopilation {
  id: number
  name: string
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, DropdownModule, TableModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  recopilations: Recopilation[] | undefined

  selectedRecopilation: Recopilation | undefined

  ngOnInit(): void {
    this.recopilations = [
      { id: 1, name: 'Recopilación 1' },
      { id: 2, name: 'Recopilación 2' },
      { id: 3, name: 'Recopilación 3' },
      { id: 4, name: 'Recopilación 4' },
      { id: 5, name: 'Recopilación 5' }
    ]
  }
}
