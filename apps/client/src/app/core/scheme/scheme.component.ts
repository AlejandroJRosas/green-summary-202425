import { Component, Inject, OnInit, Output } from '@angular/core'
import { Toast } from '../../common/toast/toast.component'
import { IndicatorService } from '../../services/indicator.service'
import { CategoryService } from '../../services/category.service'
import { CriteriaService } from '../../services/criteria.service'
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
import { ValidatedFormGroup } from '../../common/validated-form-group/validated-form-group'
import * as Yup from 'yup'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CategoryComponent } from './category/category.component'

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
    ConfirmDialogModule,
    FormsModule,
    ReactiveFormsModule,
    CategoryComponent
  ],
  templateUrl: './scheme.component.html',
  providers: [ConfirmationService]
})
export class SchemeComponent
  extends ValidatedFormGroup<Indicator>
  implements OnInit
{
  constructor(
    @Inject(Toast) private toast: Toast,
    private indicatorService: IndicatorService,
    private categoryService: CategoryService,
    private criteriaService: CriteriaService,
    private confirmationService: ConfirmationService
  ) {
    const initialControlValues = {
      index: 1,
      name: '',
      alias: '',
      helpText: ''
    }

    const validationSchema = Yup.object({
      index: Yup.number()
        .min(1, 'El indice debe ser mayor o igual a 1')
        .required('El indice es requerido'),
      name: Yup.string().required('El correo electrónico es requerido'),
      alias: Yup.string().required('El alias es requerido'),
      helpText: Yup.string().required('La ayuda es requerida')
    })

    super(initialControlValues, validationSchema)
  }

  errors = {
    index: '',
    name: '',
    alias: '',
    helpText: ''
  }

  isFetching = false
  totalItems = 0
  visibleCreateIndicator: boolean = false
  visibleEditIndicator: boolean = false

  @Output() showCreateCategory: boolean = false

  schemes: IScheme[] = []

  paginated = {
    first: 0,
    rows: 100
  }

  ngOnInit() {
    this.isFetching = true
    this.getAll()
  }

  closeDialogIndicator() {
    this.visibleCreateIndicator = false
    this.formGroup.reset()
    this.formGroup.controls.index.setValue(1)
    this.errors = {
      index: '',
      name: '',
      alias: '',
      helpText: ''
    }
  }

  showDialogCreateIndicator() {
    this.visibleCreateIndicator = true
  }

  showDialogEditIndicator(
    index: number,
    name: string,
    alias: string,
    textHelp: string
  ) {
    this.visibleEditIndicator = true
    this.formGroup.controls.index.setValue(index)
    this.formGroup.controls.name.setValue(name)
    this.formGroup.controls.alias.setValue(alias)
    this.formGroup.controls.helpText.setValue(textHelp)
  }

  confirmationDeleteIndicator(event: Event, id: number, name: string) {
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
        this.onDeleteIndicator(id)
      },
      reject: () => {
        this.toast.show('error', 'Rechazado', 'Haz rechazado la eliminación')
      }
    })
  }

  confirmationDeleteCategory(event: Event, id: number, name: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `¿Estás seguro de que quieres eliminar la categoría <strong>${name}</strong>?`,
      header: 'Eliminar categoría',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'Sí',
      rejectLabel: 'No',

      accept: () => {
        this.toast.show('success', 'Eliminado', 'Categoría eliminada con éxito')
        this.onDeleteCategory(id)
      },
      reject: () => {
        this.toast.show('error', 'Rechazado', 'Haz rechazado la eliminación')
      }
    })
  }

  confirmationDeleteCriteria(event: Event, id: number, name: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `¿Estás seguro de que quieres eliminar el criterio <strong>${name}</strong>?`,
      header: 'Eliminar criterio',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'Sí',
      rejectLabel: 'No',

      accept: () => {
        this.toast.show('success', 'Eliminado', 'Criterio eliminado con éxito')
        this.onDeleteCriteria(id)
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
          this.getCriterionPerIndicator(scheme.index)
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

  getCriterionPerIndicator(indicatorId: number) {
    this.criteriaService
      .getAllCriterionByIndicatorIndex(indicatorId)
      .subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this.schemes.map((scheme) => {
              if (scheme.index === indicatorId) {
                scheme.criterias = res.data
                console.log(res.data, scheme.criterias)
              }
            })
          }
        },
        error: (e) => {
          console.error(e)
        }
      })
  }

  onCreateIndicator() {
    const { index, name, alias, helpText: textHelp } = this.formGroup.controls
    if (!index.value || !name.value || !alias.value || !textHelp.value) return
    const indicator: Indicator = {
      index: index.value,
      name: name.value,
      alias: alias.value,
      helpText: textHelp.value
    }
    this.indicatorService.create(indicator).subscribe({
      next: () => {
        this.getAll()
        this.toast.show('success', 'Creado', 'Indicador creado con éxito')
        this.closeDialogIndicator()
      },
      error: (e) => {
        this.toast.show('error', 'Error', e.error.message)
      }
    })
  }

  onEditIndicator() {
    const { index, name, alias, helpText: textHelp } = this.formGroup.controls
    if (!index.value || !name.value || !alias.value || !textHelp.value) return
    const indicator: Indicator = {
      index: index.value,
      name: name.value,
      alias: alias.value,
      helpText: textHelp.value
    }
    this.indicatorService.edit(index.value, indicator).subscribe({
      next: () => {
        this.getAll()
        this.toast.show('success', 'Editado', 'Indicador editado con éxito')
        this.closeDialogIndicator()
      },
      error: (e) => {
        this.toast.show('error', 'Error', e.error.message)
      }
    })
  }

  onDeleteIndicator(id: number) {
    this.indicatorService.delete(id).subscribe({
      next: () => {
        this.getAll()
      },
      error: (e) => {
        console.error(e)
      }
    })
  }

  onDeleteCategory(id: number) {
    this.categoryService.delete(id).subscribe({
      next: () => {
        this.getAll()
      },
      error: (e) => {
        console.error(e)
      }
    })
  }

  onDeleteCriteria(id: number) {
    this.criteriaService.delete(id).subscribe({
      next: () => {
        this.getAll()
      },
      error: (e) => {
        console.error(e)
      }
    })
  }
}

type IScheme = Indicator & { categories: Category[]; criterias: Criteria[] }
