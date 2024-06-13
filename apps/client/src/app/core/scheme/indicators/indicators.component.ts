import { Component, Inject, OnInit } from '@angular/core'
import { ValidatedFormGroup } from '../../../common/validated-form-group/validated-form-group'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AccordionModule } from 'primeng/accordion'
import { ButtonModule } from 'primeng/button'
import { ConfirmDialogModule } from 'primeng/confirmdialog'
import { DialogModule } from 'primeng/dialog'
import { InputTextModule } from 'primeng/inputtext'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { PanelModule } from 'primeng/panel'
import { Indicator } from '../../../../shared/types/indicator.type'
import { CategoryComponent } from '../categories/categories.component'
import { CriteriaComponent } from '../criteria/criteria.component'
import { ConfirmationService } from 'primeng/api'
import { Toast } from '../../../common/toast/toast.component'
import { CategoryService } from '../../../services/category.service'
import { CriteriaService } from '../../../services/criteria.service'
import { IndicatorService } from '../../../services/indicator.service'
import * as Yup from 'yup'
import { Category } from '../../../../shared/types/category.type'
import { Criteria } from '../../../../shared/types/criterion.type'

@Component({
  selector: 'indicators',
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
    CategoryComponent,
    CriteriaComponent
  ],
  templateUrl: './indicators.component.html',
  styles: ``
})
export class IndicatorsComponent
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
      name: Yup.string().required('El nombre es requerido'),
      alias: Yup.string().required('El alias es requerido'),
      helpText: Yup.string().required('El texto de ayuda es requerido')
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
  visibleCreate: boolean = false
  visibleEdit: boolean = false
  indexEdit: number = 1

  schemes: IScheme[] = []

  paginated = {
    first: 0,
    rows: 100
  }
  ngOnInit() {
    this.isFetching = true
    this.getAll()
  }
  closeDialog() {
    this.visibleCreate = false
    this.visibleEdit = false
    this.formGroup.reset()
    this.formGroup.controls.index.setValue(1)
    this.errors = {
      index: '',
      name: '',
      alias: '',
      helpText: ''
    }
  }
  showDialogEditIndicator(
    index: number,
    name: string,
    alias: string,
    helpText: string
  ) {
    this.visibleEdit = true
    this.indexEdit = index
    this.formGroup.controls.index.setValue(index)
    this.formGroup.controls.name.setValue(name)
    this.formGroup.controls.alias.setValue(alias)
    this.formGroup.controls.helpText.setValue(helpText)
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
        this.toast.show('info', 'Eliminando..', 'Eliminando indicador..')
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
          this.getCriterionPerIndicator(scheme.index)
        }
      },
      error: (e) => {
        console.error(e)
        this.toast.show('error', 'Error', e.error.message)
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
          }
        },
        error: (e) => {
          console.error(e)
          this.toast.show('error', 'Error', e.error.message)
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
              }
            })
          }
        },
        error: (e) => {
          console.error(e)
          this.toast.show('error', 'Error', e.error.message)
        }
      })
  }

  onCreate() {
    const { index, name, alias, helpText } = this.formGroup.controls
    if (!index.value || !name.value || !alias.value || !helpText.value) return
    const indicator: Indicator = {
      index: index.value,
      name: name.value,
      alias: alias.value,
      helpText: helpText.value
    }
    this.indicatorService.create(indicator).subscribe({
      next: () => {
        this.getAll()
        this.toast.show('success', 'Creado', 'Indicador creado con éxito')
        this.closeDialog()
      },
      error: (e) => {
        this.toast.show('error', 'Error', e.error.message)
        this.closeDialog()
      }
    })
  }

  onEdit() {
    const { index, name, alias, helpText } = this.formGroup.controls
    const indicator: Indicator = {
      index: index.value,
      name: name.value,
      alias: alias.value,
      helpText: helpText.value
    }
    this.indicatorService.edit(this.indexEdit, indicator).subscribe({
      next: () => {
        this.getAll()
        this.toast.show('success', 'Editado', 'Indicador editado con éxito')
        this.closeDialog()
      },
      error: (e) => {
        this.toast.show('error', 'Error', e.error.message)
        this.closeDialog()
      }
    })
  }

  onDelete(id: number) {
    this.indicatorService.delete(id).subscribe({
      next: () => {
        this.toast.show('success', 'Eliminado', 'Indicador eliminado con éxito')
        this.getAll()
      },
      error: (e) => {
        console.error(e)
      }
    })
  }
}
type IScheme = Indicator & { categories: Category[]; criterias: Criteria[] }
