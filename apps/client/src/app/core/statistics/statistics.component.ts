/* eslint-disable no-constant-binary-expression */
import { Component, Inject } from '@angular/core'
import { Toast } from '../../common/toast/toast.component'
import { RecopilationService } from '../../services/recopilation.service'
import { Recopilation } from '../../../shared/types/recopilation.type'
import { DropdownModule } from 'primeng/dropdown'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [FormsModule, DropdownModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {
  constructor(
    @Inject(Toast) private toast: Toast,
    private recopilationService: RecopilationService
  ) {}

  recopilations: Recopilation[] = []
  selectedRecopilation: number =
    Number(localStorage.getItem('selectedRecopilation')) ?? 0

  ngOnInit(): void {
    this.getAllRecopilations()
  }

  getAllRecopilations() {
    this.recopilationService.getAll().subscribe((recopilations) => {
      this.recopilations = recopilations
      if (this.recopilations.length === 1 && this.selectedRecopilation === 0) {
        this.updateLocalSelectedRecopilation()
        this.selectedRecopilation = this.recopilations[0].id
        this.getStats()
      } else if (this.selectedRecopilation !== 0) {
        this.getStats()
      }
    })
  }

  getStats() {
    console.log(
      'Ejecutar llamada a stats de recopilación ',
      this.selectedRecopilation
    )
  }

  updateLocalSelectedRecopilation() {
    localStorage.removeItem('selectedRecopilation')
    localStorage.setItem(
      'selectedRecopilation',
      this.selectedRecopilation.toString()
    )
  }
}
