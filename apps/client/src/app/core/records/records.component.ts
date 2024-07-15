import { Component, OnInit } from '@angular/core'
import { DropdownModule } from 'primeng/dropdown'
import { FormsModule } from '@angular/forms'
import { PanelModule } from 'primeng/panel'
import { type Recopilation } from '../../../shared/types/recopilation.type'
import { type Indicator } from '../../../shared/types/indicator.type'
import { RecopilationService } from '../../services/recopilation.service'
import {
  CategoryByRecopilation,
  IndicatorByRecopilation,
  IndicatorService
} from '../../services/indicator.service'
import { RecordsCategoryHeaderComponent } from './category/header/header.component'
import { RecordsCategoryBodyComponent } from './category/body/body.component'

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    PanelModule,
    RecordsCategoryHeaderComponent,
    RecordsCategoryBodyComponent
  ],
  templateUrl: './records.component.html'
})
export class RecordsComponent implements OnInit {
  public recopilation: Recopilation | undefined

  public recopilations: Recopilation[] | undefined

  public indicator: Indicator | undefined

  public indicators: Indicator[] | undefined

  public categoriesAndCriteria: CategoryByRecopilation[] | undefined

  private indicatorsByRecopilation: IndicatorByRecopilation[] | undefined

  constructor(
    private recopilationService: RecopilationService,
    private indicatorService: IndicatorService
  ) {}

  ngOnInit(): void {
    this.initializeRecopilations()
  }

  initializeRecopilations(): void {
    this.recopilationService.getActiveMapped().subscribe((recopilations) => {
      this.recopilations = recopilations
    })
  }

  updateIndicators(): void {
    if (this.recopilation == null) {
      this.indicators = []
      return
    }

    this.resetIndicators()
    this.resetCategoriesAndCriteria()

    this.indicatorService
      .getByRecopilation(this.recopilation.id)
      .subscribe((indicatorsByRecopilation) => {
        this.indicatorsByRecopilation = indicatorsByRecopilation

        this.indicators = this.indicatorsByRecopilation.map((i) => ({
          index: i.index,
          alias: i.alias,
          helpText: i.helpText,
          name: i.name
        }))
      })
  }

  updateCategoriesAndCriteria(): void {
    if (this.indicatorsByRecopilation == null || this.indicator == null) {
      this.categoriesAndCriteria = []
      return
    }

    this.resetCategoriesAndCriteria()

    this.categoriesAndCriteria = this.indicatorsByRecopilation.find(
      (i) => i.index === this.indicator!.index
    )?.categories
  }

  resetIndicators(): void {
    this.indicator = undefined
    this.indicators = []
  }

  resetCategoriesAndCriteria(): void {
    this.categoriesAndCriteria = []
  }
}
