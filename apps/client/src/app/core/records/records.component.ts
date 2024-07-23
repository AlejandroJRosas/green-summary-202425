/* eslint-disable no-constant-binary-expression */
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core'
import { DropdownModule } from 'primeng/dropdown'
import { FormsModule } from '@angular/forms'
import { Panel, PanelModule } from 'primeng/panel'
import { ButtonModule } from 'primeng/button'
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
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    PanelModule,
    ButtonModule,
    RecordsCategoryHeaderComponent,
    RecordsCategoryBodyComponent,
    ScrollTopModule
  ],
  templateUrl: './records.component.html'
})
export class RecordsComponent implements OnInit {
  @ViewChildren(RecordsCategoryBodyComponent)
  public recordsCategoryBodyComponents:
    | QueryList<RecordsCategoryBodyComponent>
    | undefined

  @ViewChildren(Panel) public panels: QueryList<Panel> | undefined

  public allCollapsed: boolean = true
  public selectedRecopilation: number =
    Number(localStorage.getItem('selectedRecopilation')) ?? 0
  public recopilations: Recopilation[] | undefined
  public indicator: number | undefined
  public indicators: Indicator[] | undefined
  public categoriesAndCriteria: CategoryByRecopilation[] | undefined
  private indicatorsByRecopilation: IndicatorByRecopilation[] | undefined

  searchParamRecopilationId: number | undefined
  searchParamIndicatorId: number | undefined

  constructor(
    private recopilationService: RecopilationService,
    private indicatorService: IndicatorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['recopilationId'] && params['indicatorId']) {
        this.selectedRecopilation = +params['recopilationId']
        this.searchParamIndicatorId = this.indicator = +params['indicatorId']
      }
      this.initializeRecopilations()
    })
  }

  selectedIndicator: number = 0

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

        if (this.indicatorsByRecopilation.length > 0) {
          this.indicator =
            this.searchParamIndicatorId ??
            this.indicatorsByRecopilation[0].index

          this.searchParamIndicatorId = undefined

          this.updateCategoriesAndCriteria()
        }
      })
  }

  updateCategoriesAndCriteria(): void {
    if (this.indicatorsByRecopilation == null || this.indicator == null) {
      this.categoriesAndCriteria = []
      return
    }

    this.resetCategoriesAndCriteria()

    this.categoriesAndCriteria = this.indicatorsByRecopilation.find(
      (i) => i.index === this.indicator
    )?.categories
  }

  resetIndicators(): void {
    this.indicator = undefined
    this.indicators = []
  }

  resetCategoriesAndCriteria(): void {
    this.categoriesAndCriteria = []
  }

  //!DO NOT REMOVE THIS METHOD
  changed() {}

  collapseAll() {
    if (this.recordsCategoryBodyComponents == null) return
    if (this.panels == null) return

    this.allCollapsed = true

    this.recordsCategoryBodyComponents.forEach((body) => body.collapseAll())

    this.panels.forEach((panel) => {
      if (panel.collapsed) return

      panel.animating = true
      panel.collapse()
    })
  }

  expandAll() {
    if (this.recordsCategoryBodyComponents == null) return
    if (this.panels == null) return

    this.allCollapsed = false

    this.recordsCategoryBodyComponents.forEach((body) => body.expandAll())

    this.panels.forEach((panel) => {
      if (!panel.collapsed) return

      panel.animating = true
      panel.expand()
    })
  }
}
