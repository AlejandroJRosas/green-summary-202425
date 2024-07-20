/* eslint-disable no-constant-binary-expression */
import { Component, Inject } from '@angular/core'
import {
  RecopilationService,
  StatisticsDto
} from '../../services/recopilation.service'
import { Recopilation } from '../../../shared/types/recopilation.type'
import { DropdownModule } from 'primeng/dropdown'
import { CardModule } from 'primeng/card'
import { ChartModule } from 'primeng/chart'
import { FormsModule } from '@angular/forms'
import { CardComponent } from './components/card/card.component'
import { Toast } from '../../common/toast/toast.component'
import { HorizontalBarComponent } from './components/horizontal-bar/horizontal-bar.component'
import { ProgressBarModule } from 'primeng/progressbar'
import { TooltipModule } from 'primeng/tooltip'
import { DepartmentsPerformanceComponent } from './components/departments-performance/departments-performance.component'
import { ScrollTopModule } from 'primeng/scrolltop'
import { IndicatorsPieChartComponent } from './components/indicators-pie-chart/indicators-pie-chart.component'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    DropdownModule,
    CardModule,
    ChartModule,
    CardComponent,
    HorizontalBarComponent,
    ProgressBarModule,
    TooltipModule,
    DepartmentsPerformanceComponent,
    ScrollTopModule,
    IndicatorsPieChartComponent
  ],
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
  stats: StatisticsDto | undefined

  ngOnInit(): void {
    this.getAllRecopilations()
  }

  getAllRecopilations() {
    this.recopilationService.getAll().subscribe((recopilations) => {
      this.recopilations = recopilations
      if (
        this.recopilations.length === 1 &&
        (this.selectedRecopilation === 0 ||
          this.recopilations.find(
            (recopilation) => recopilation.id === this.selectedRecopilation
          ) === undefined)
      ) {
        this.updateLocalSelectedRecopilation()
        this.selectedRecopilation = this.recopilations[0].id
        this.getStats()
      } else if (
        this.selectedRecopilation !== 0 &&
        this.recopilations.find(
          (recopilation) => recopilation.id === this.selectedRecopilation
        ) !== undefined
      ) {
        this.getStats()
      }
    })
  }

  updateLocalSelectedRecopilation() {
    localStorage.removeItem('selectedRecopilation')
    localStorage.setItem(
      'selectedRecopilation',
      this.selectedRecopilation.toString()
    )
  }

  getStats() {
    this.recopilationService
      .getStatisticsPerRecopilation(this.selectedRecopilation)
      .subscribe({
        next: (stats) => {
          this.updateLocalSelectedRecopilation()
          this.stats = stats ?? undefined
          console.log(stats)
        },
        error: () => {
          this.toast.show('error', 'Error', 'Error al obtener las estadísticas')
        }
      })
  }

  getCompletionValue(answers: number, total: number): string {
    return ((answers / total) * 100).toFixed(0)
  }
}
