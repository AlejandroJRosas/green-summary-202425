import { Component, Inject, OnInit } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { DropdownModule } from 'primeng/dropdown'
import { recopilations } from '../recopilations.data'
import { ActivatedRoute, Router } from '@angular/router'
import { CheckboxModule } from 'primeng/checkbox'
import { ReactiveFormsModule } from '@angular/forms'
import {
  Category,
  categoriesIndicator1,
  categoriesIndicator2
} from './categories.data'
import { Toast } from '../../../../../common/toast/toast.component'
import { IndicatorService } from '../../../../../services/indicator.service'
import { Indicator } from '../../../../../../shared/types/indicator.type'
import { Criteria } from '../../../../../../shared/types/criterion.type'
import { RecopilationService } from '../../../../../services/recopilation.service'
import { PanelModule } from 'primeng/panel'

interface selectedData {
  key: string | number
  label: string
  data: string
  categories: Category[]
  children: Node[]
  type: string
  category: null | string
}
@Component({
  selector: 'app-select-indicators-categories-criteria',
  standalone: true,
  imports: [
    ButtonModule,
    DropdownModule,
    CheckboxModule,
    PanelModule,
    CheckboxModule,
    DropdownModule,
    ReactiveFormsModule
  ],
  templateUrl: './select-indicators-categories-criteria.component.html'
})
export class SelectIndicatorsCategoriesCriteriaComponent implements OnInit {
  constructor(
    @Inject(Toast) private toast: Toast,
    private router: Router,
    private route: ActivatedRoute,
    private recopilationService: RecopilationService,
    private indicatorService: IndicatorService
  ) {
    this.route.params.subscribe((params) => {
      this.recopilationId = parseInt(params['recopilationId'], 10)
    })
  }
  recopilations = recopilations
  categoriesIndicator1 = categoriesIndicator1
  categoriesIndicator2 = categoriesIndicator2

  selectedData: selectedData[] = []
  onSelectionChangeDropdown(category: string, keyCriteria: string) {
    const node = this.selectedData.find((file) => file.key === keyCriteria)
    if (node) {
      node.category = category
    }
  }

  recopilationId = 0
  schemes: Scheme[] = []
  indicators: RelateIndicators[] = []

  updateIndicatorId(indicatorIndex: number, isChecked: boolean): void {
    if (isChecked) {
      const isPresent = this.indicators.some(
        (indicator) => indicator.indicatorId === indicatorIndex
      )
      if (!isPresent) {
        this.indicators.push({
          indicatorId: indicatorIndex,
          criterion: []
        })
      }
    } else {
      this.indicators = this.indicators.filter(
        (indicator) => indicator.indicatorId !== indicatorIndex
      )
    }
    console.log('Indicator Index: ', this.indicators)
  }

  ngOnInit() {
    this.loadScheme()
  }

  loadScheme() {
    this.indicatorService.getAllIndicators().subscribe({
      next: (indicators) => {
        this.schemes = indicators
        console.log('Schemes: ', this.schemes)
      },
      error: (error) => {
        console.log(error)
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
    const payload = {
      recopilationId: this.recopilationId,
      indicators: this.indicators
    }
    this.recopilationService.relateIndicators(payload)
    this.nextStep()
    this.toast.show(
      'success',
      'Éxito',
      'Esquema de recopilación agregado correctamente'
    )
  }
}

type Scheme = Indicator & { categories: Category[]; criterias: Criteria[] }

type RelateIndicators = {
  indicatorId: number
  criterion: {
    criteriaId: number
    categoryId: number
  }[]
}
