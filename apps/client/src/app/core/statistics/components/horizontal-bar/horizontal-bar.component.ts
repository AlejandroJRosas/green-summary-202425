import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core'
import { StatisticsDto } from '../../../../services/recopilation.service'
import { options } from './horizontal-bar-options'
import { ChartModule } from 'primeng/chart'
import { ChartData } from '../../../../../shared/types/chart.type'

@Component({
  selector: 'app-horizontal-bar',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './horizontal-bar.component.html',
  styleUrl: './horizontal-bar.component.css'
})
export class HorizontalBarComponent implements OnInit, OnChanges {
  @Input() stats: StatisticsDto | null = null
  rankingData: ChartData | null = null
  options = options

  ngOnInit(): void {
    this.getRankingData(this.stats)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['stats']) {
      this.getRankingData(this.stats)
    }
  }

  getRankingData(stats: StatisticsDto | null) {
    if (stats?.departmentsRanking.length === 0) {
      this.rankingData = null
      return
    }

    const data: ChartData = {
      labels: [],
      datasets: [
        {
          label: 'Ranking de Departamentos',
          backgroundColor: '#22c55edd',
          borderColor: 'transparent',
          data: []
        }
      ]
    }

    if (stats) {
      stats.departmentsRanking.forEach((item, index) => {
        data.labels.push(`#${index + 1} ${item.department.fullName}`)
        data.datasets[0].data.push(item.answersQuantity)
      })
    }

    this.rankingData = data
  }
}
