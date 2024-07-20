import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core'
import { ChartModule } from 'primeng/chart'
import { PieChartData } from '../../../../../shared/types/chart.type'
import { MatrixInfoDto } from '../../../../services/recopilation.service'

@Component({
  selector: 'app-indicators-pie-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './indicators-pie-chart.component.html',
  styleUrl: './indicators-pie-chart.component.css'
})
export class IndicatorsPieChartComponent implements OnInit, OnChanges {
  @Input() matrixData: MatrixInfoDto | null = null
  totalAnswers = 0
  indicatorsData: PieChartData | null = null

  ngOnInit(): void {
    this.getIndicatorsData(this.matrixData)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['matrixData']) {
      this.getIndicatorsData(this.matrixData)
    }
  }

  getIndicatorsData(matrix: MatrixInfoDto | null) {
    if (matrix?.indicators.length === 0) {
      this.indicatorsData = null
      return
    }

    const data: PieChartData = {
      labels: [],
      datasets: [
        {
          label: 'Respuestas de Indicadores',
          backgroundColor: [
            '#c7ceea',
            '#b5ead7',
            '#e2f0cb',
            '#ffdac1',
            '#ffb7b2',
            '#ff9aa2'
          ],
          hoverBackgroundColor: [
            '#c7ceeaa1',
            '#b5ead7a1',
            '#e2f0cba1',
            '#ffdac1a1',
            '#ffb7b2a1',
            '#ff9aa2a1'
          ],
          data: []
        }
      ]
    }

    if (matrix) {
      matrix.indicators.forEach((indicator) => {
        let counter = 0
        indicator.categories.forEach((category) => {
          matrix.departments.forEach((department) => {
            department.answers.forEach((answer) => {
              if (answer.categoryId === category.id && answer.isAnswered) {
                counter++
              }
            })
          })
        })

        if (counter > 0) {
          data.labels.push(indicator.alias)
          data.datasets[0].data.push(counter)
        }
      })
    }

    if (data.labels.length === 0) {
      this.indicatorsData = null
      return
    }
    this.indicatorsData = data
    this.totalAnswers = data.datasets[0].data.reduce(
      (acc, curr) => acc + curr,
      0
    )
  }
}
