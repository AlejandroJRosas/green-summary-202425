import { Component, Inject } from '@angular/core'
import { Toast } from '../../common/toast/toast.component'
import { IndicatorService } from '../../services/indicator.service'
import { CategoryService } from '../../services/categories.service'
import { CriteriaService } from '../../services/criterion.service'
import { Indicator } from '../../../shared/types/indicator.type'
import { ButtonModule } from 'primeng/button'
import { AccordionModule } from 'primeng/accordion'
import { PanelModule } from 'primeng/panel'
import { Category } from '../../../shared/types/category.type'
import { Criteria } from '../../../shared/types/criterion.type'
import { DialogModule } from 'primeng/dialog'
import { InputTextModule } from 'primeng/inputtext'
import { InputTextareaModule } from 'primeng/inputtextarea'

@Component({
  selector: 'app-scheme',
  standalone: true,
  imports: [
    ButtonModule,
    AccordionModule,
    PanelModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule
  ],
  templateUrl: './scheme.component.html'
})
export class SchemeComponent {
  constructor(
    @Inject(Toast) private toast: Toast,
    private indicatorService: IndicatorService,
    private categoryService: CategoryService,
    private criteriaService: CriteriaService
  ) {}

  isFetching = false
  totalItems = 0
  visibleCreateIndicator: boolean = false

  schemes: Scheme[] = []

  paginated = {
    first: 0,
    rows: 100
  }

  ngOnInit() {
    this.isFetching = true
    this.getAll()
  }
  closeDialog() {
    this.visibleCreateIndicator = false
  }
  showDialogCreateIndicator() {
    this.visibleCreateIndicator = true
  }

  getAll() {
    this.indicatorService.getAll(this.paginated).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.totalItems = res.data.totalItems
          this.schemes = res.data.items.map((indicator) => {
            return {
              ...indicator,
              categories: [],
              criterias: []
            }
          })
        }
        this.isFetching = false
        for (const scheme of this.schemes) {
          this.getCategoriesPerIndicator(scheme.index)
        }
      },
      error: (e) => {
        console.error(e)
        this.isFetching = false
      }
    })
  }

  getCategoriesPerIndicator(indicatorId: number) {
    this.categoryService
      .getAllCategoriesByIndicatorIndex(indicatorId)
      .subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this.schemes.map((scheme) => {
              if (scheme.index === indicatorId) {
                scheme.categories = res.data
              }
            })
            console.log(res.data)
          }
        },
        error: (e) => {
          console.error(e)
        }
      })
  }

  onCreateIndicator() {}
}

type Scheme = Indicator & { categories: Category[]; criterias: Criteria[] }
