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
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { ConfirmationService } from 'primeng/api'

@Component({
  selector: 'app-scheme',
  standalone: true,
  imports: [
    ButtonModule,
    AccordionModule,
    PanelModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    ConfirmDialogModule
  ],
  templateUrl: './scheme.component.html',
  providers: [ConfirmationService]
})
export class SchemeComponent {
  constructor(
    @Inject(Toast) private toast: Toast,
    private indicatorService: IndicatorService,
    private categoryService: CategoryService,
    private criteriaService: CriteriaService,
    private confirmationService: ConfirmationService
  ) {}

  isFetching = false
  totalItems = 0
  visibleCreateIndicator: boolean = false
  visibleEditIndicator: boolean = false

  schemes: Scheme[] = []

  paginated = {
    first: 0,
    rows: 100
  }

  ngOnInit() {
    this.isFetching = true
    this.getAll()
  }
  closeDialogCreateIndicator() {
    this.visibleCreateIndicator = false
  }
  closeDialogEditIndicator() {
    this.visibleEditIndicator = false
  }
  showDialogCreateIndicator() {
    this.visibleCreateIndicator = true
  }
  showDialogEditIndicator() {
    this.visibleEditIndicator = true
  }
  confirmationDelete(event: Event, id: number, name: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `¿Estás seguro de que quieres eliminar el indicador <strong>${name}</strong>?`,
      header: 'Eliminar indicador',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'Sí',
      rejectLabel: 'No',

      accept: () => {
        this.toast.show('success', 'Eliminado', 'Indicador eliminado con éxito')
        this.onDelete(id)
      },
      reject: () => {
        this.toast.show('error', 'Rechazado', 'Haz rechazado la eliminación')
      }
    })
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
  onEditIndicator() {}
  onDelete(id: number) {}
}

type Scheme = Indicator & { categories: Category[]; criterias: Criteria[] }
