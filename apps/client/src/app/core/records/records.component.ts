/* eslint-disable no-constant-binary-expression */
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
import { ScrollTopModule } from 'primeng/scrolltop'

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    PanelModule,
    RecordsCategoryHeaderComponent,
    RecordsCategoryBodyComponent,
    ScrollTopModule
  ],
  templateUrl: './records.component.html'
})
export class RecordsComponent implements OnInit {
  public selectedRecopilation: number =
    Number(localStorage.getItem('selectedRecopilation')) ?? 0

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
      if (
        this.recopilations.length === 1 &&
        (this.selectedRecopilation === 0 ||
          this.recopilations.find(
            (recopilation) => recopilation.id === this.selectedRecopilation
          ) === undefined)
      ) {
        this.updateLocalSelectedRecopilation()
        this.selectedRecopilation = this.recopilations[0].id
        this.updateIndicators()
      } else if (
        this.selectedRecopilation !== 0 &&
        this.recopilations.find(
          (recopilation) => recopilation.id === this.selectedRecopilation
        ) !== undefined
      ) {
        this.updateIndicators()
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

  updateIndicators(): void {
    this.updateLocalSelectedRecopilation()
    if (this.selectedRecopilation === 0) {
      this.indicators = []
      return
    }

    this.resetIndicators()
    this.resetCategoriesAndCriteria()

    this.indicatorService
      .getByRecopilation(this.selectedRecopilation)
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
