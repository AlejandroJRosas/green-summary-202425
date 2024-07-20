import {
  Component,
  Inject,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { DropdownModule } from 'primeng/dropdown'
import { ActivatedRoute, Router } from '@angular/router'
import { CheckboxModule } from 'primeng/checkbox'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { Toast } from '../../../../../common/toast/toast.component'
import { IndicatorService } from '../../../../../services/indicator.service'
import { Indicator } from '../../../../../../shared/types/indicator.type'
import { Criteria } from '../../../../../../shared/types/criterion.type'
import { RecopilationService } from '../../../../../services/recopilation.service'
import { Panel, PanelModule } from 'primeng/panel'
import { Category } from '../../../../../../shared/types/category.type'
import { Recopilation } from '../../../../../../shared/types/recopilation.type'
import { ScrollTopModule } from 'primeng/scrolltop'

@Component({
  selector: 'app-select-indicators-categories-criteria',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    DropdownModule,
    CheckboxModule,
    PanelModule,
    CheckboxModule,
    DropdownModule,
    ReactiveFormsModule,
    ScrollTopModule
  ],
  templateUrl: './select-indicators-categories-criteria.component.html'
})
export class SelectIndicatorsCategoriesCriteriaComponent implements OnInit {
  @ViewChildren(Panel) panels: QueryList<Panel> | undefined

  allCollapsed: boolean = true

  //!DO NOT REMOVE THIS METHOD
  changed() {}

  collapseAll() {
    if (this.panels == null) return

    this.allCollapsed = true

    this.panels.forEach((panel) => {
      if (panel.collapsed) return

      panel.animating = true
      panel.collapse()
    })
  }

  expandAll() {
    if (this.panels == null) return

    this.allCollapsed = false

    this.panels.forEach((panel) => {
      if (!panel.collapsed) return

      panel.animating = true
      panel.expand()
    })
  }

  constructor(
    @Inject(Toast) private toast: Toast,
    private router: Router,
    private route: ActivatedRoute,
    private recopilationService: RecopilationService,
    private indicatorService: IndicatorService
  ) {
    this.route.params.subscribe((params) => {
      this.recopilationId = parseInt(params['recopilationId']) || -1
    })
  }
  previousRecopilations: Recopilation[] = []

  recopilationId = -1
  schemes: Scheme[] = []
  indicators: IndicatorToRelateFormValues[] = []

  ngOnInit() {
    this.loadScheme()
    this.loadRecopilationPreviousData(this.recopilationId)
    this.loadPreviousRecopilationsList()
  }

  onChangePreviousRecopilationSelection(recopilationId: number) {
    this.loadRecopilationPreviousData(recopilationId)
  }

  private loadPreviousRecopilationsList() {
    this.recopilationService.getAll().subscribe({
      next: (recopilations) => {
        this.previousRecopilations = recopilations
      },
      error: (e) => {
        if (e.error.data != null) {
          this.toast.show('error', 'Error', e.error.data.message)
        } else {
          this.toast.show('error', 'Error', e.error.message)
        }
      }
    })
  }

  private loadRecopilationPreviousData(recopilationId: number) {
    this.recopilationService.getDetailedById(recopilationId).subscribe({
      next: (data) => {
        if (!data) return

        this.indicators = data.indicators.map((i) => ({
          indicatorId: i.indicator.index,
          criterion: i.criteria.map((c) => ({
            criteriaId: c.criterion.id,
            categoryId: c.category.id,
            selected: true
          })),
          selected: true
        }))
      },
      error: (e) => {
        if (e.error.data != null) {
          this.toast.show('error', 'Error', e.error.data.message)
        } else {
          this.toast.show('error', 'Error', e.error.message)
        }
      }
    })
  }

  onChangeIndicatorCheckbox(indicatorIndex: number, isChecked: boolean): void {
    const alreadyInsertedIndicator = this.indicators.find(
      (indicator) => indicator.indicatorId === indicatorIndex
    )

    if (isChecked) {
      if (alreadyInsertedIndicator) {
        alreadyInsertedIndicator.selected = true
      } else {
        this.indicators.push({
          indicatorId: indicatorIndex,
          criterion: [],
          selected: true
        })
      }
    } else {
      alreadyInsertedIndicator!.selected = false
    }
  }

  private loadScheme() {
    this.indicatorService.getAllIndicators().subscribe({
      next: (indicators) => {
        this.schemes = indicators
      },
      error: (e) => {
        if (e.error.data != null) {
          this.toast.show('error', 'Error', e.error.data.message)
        } else {
          this.toast.show('error', 'Error', e.error.message)
        }
      }
    })
  }

  nextStep() {
    this.router.navigateByUrl(
      `pages/recopilations/steps-create/recommend-categories-department/${this.recopilationId}`
    )
  }

  prevStep() {
    this.router.navigateByUrl(
      `pages/recopilations/steps-create/select-departments/${this.recopilationId}`
    )
  }

  onSubmit() {
    const payload = this.adaptFormValuesToDto()

    this.recopilationService.relateIndicators(payload).subscribe({
      next: () => {
        this.nextStep()
        this.toast.show(
          'success',
          'Éxito',
          'Esquema de recopilación agregado correctamente'
        )
      },
      error: (e) => {
        if (e.error.data != null) {
          this.toast.show('error', 'Error', e.error.data.message)
        } else {
          this.toast.show('error', 'Error', e.error.message)
        }
      }
    })
  }

  onChangeCriterionCheckbox(
    indicatorIndex: number,
    criteriaId: number,
    isChecked: boolean
  ) {
    if (isChecked) {
      this.addCriterionToIndicator(indicatorIndex, criteriaId)
    } else {
      this.removeCriterionFromIndicator(indicatorIndex, criteriaId)
    }
  }

  onChangeCategorySelection(
    indicatorIndex: number,
    criterionId: number,
    categoryId: number
  ) {
    const indicator = this.indicators.find(
      (indicator) => indicator.indicatorId === indicatorIndex
    )

    if (!indicator) return

    const alreadyInsertedCriterion = indicator.criterion.find(
      (c) => c.criteriaId === criterionId
    )

    if (alreadyInsertedCriterion) {
      alreadyInsertedCriterion.categoryId = categoryId
    }
  }

  isSelectedIndicator(indicatorIndex: number) {
    return this.indicators.some(
      (indicator) =>
        indicator.indicatorId === indicatorIndex && indicator.selected
    )
  }

  isCheckedCriterion(indicatorIndex: number, criteriaId: number) {
    const indicator = this.indicators.find(
      (indicator) => indicator.indicatorId === indicatorIndex
    )

    if (!indicator) return false

    return indicator.criterion.some(
      (c) => c.criteriaId === criteriaId && c.selected
    )
  }

  getCategorySelection(indicatorIndex: number, criteriaId: number) {
    const indicator = this.indicators.find(
      (indicator) => indicator.indicatorId === indicatorIndex
    )

    if (!indicator) return null

    const criterion = indicator.criterion.find(
      (c) => c.criteriaId === criteriaId
    )

    if (!criterion) return null

    return criterion.categoryId
  }

  private adaptFormValuesToDto() {
    return {
      recopilationId: this.recopilationId,
      indicators: this.indicators
        .filter((i) => i.selected && i.criterion.length > 0)
        .map((i) => ({
          indicatorId: i.indicatorId,
          criterion: i.criterion
            .filter(
              (c) =>
                c.categoryId !== null && c.criteriaId !== null && c.selected
            )
            .map((c) => ({
              criteriaId: c.criteriaId,
              categoryId: c.categoryId
            }))
        })) as IndicatorToRelate[]
    }
  }

  private addCriterionToIndicator(indicatorIndex: number, criteriaId: number) {
    const indicator = this.indicators.find(
      (indicator) => indicator.indicatorId === indicatorIndex
    )

    if (!indicator) return

    const alreadyInsertedCriterion = indicator.criterion.find(
      (c) => c.criteriaId === criteriaId && c.selected
    )

    if (alreadyInsertedCriterion) {
      alreadyInsertedCriterion.criteriaId = criteriaId
    } else {
      indicator.criterion.push({
        criteriaId,
        categoryId: null,
        selected: true
      })
    }
  }

  private removeCriterionFromIndicator(
    indicatorIndex: number,
    criterionId: number
  ) {
    const indicator = this.indicators.find(
      (indicator) => indicator.indicatorId === indicatorIndex
    )

    if (!indicator) return

    const criterionToRemove = indicator.criterion.find(
      (i) => i.criteriaId === criterionId
    )

    if (!criterionToRemove) return

    criterionToRemove.selected = false
  }
}

type Scheme = Indicator & { categories: Category[]; criterias: Criteria[] }

type IndicatorToRelate = {
  indicatorId: number
  criterion: {
    criteriaId: number
    categoryId: number
  }[]
}

type IndicatorToRelateFormValues = {
  indicatorId: number
  criterion: {
    criteriaId: number | null
    categoryId: number | null
    selected: boolean
  }[]
  selected: boolean
}
