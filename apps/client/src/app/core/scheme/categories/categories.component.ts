import { Component, Inject, Input } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ValidatedFormGroup } from '../../../common/validated-form-group/validated-form-group'
import * as Yup from 'yup'
import {
  CategoryService,
  CategoryDTO as CategoryDTO
} from '../../../services/category.service'
import { Toast } from '../../../common/toast/toast.component'
import { InputTextModule } from 'primeng/inputtext'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { Category } from '../../../../shared/types/category.type'
import { ConfirmationService } from 'primeng/api'
import { PanelModule } from 'primeng/panel'

@Component({
  selector: 'categories',
  standalone: true,
  imports: [
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    PanelModule
  ],
  templateUrl: './categories.component.html'
})
export class CategoryComponent extends ValidatedFormGroup<formPayload> {
  constructor(
    @Inject(Toast) private toast: Toast,
    private confirmationService: ConfirmationService,
    private categoryService: CategoryService
  ) {
    const initialControlValues = {
      name: '',
      helpText: ''
    }
    const validationSchema = Yup.object({
      name: Yup.string().required('El nombre es requerido'),
      helpText: Yup.string().required('La ayuda es requerida')
    })

    super(initialControlValues, validationSchema)
  }

  errors = {
    name: '',
    helpText: ''
  }
  @Input() categories: Category[] = []
  @Input() indicatorIndex: number = 0
  visibleCreate = false
  visibleEdit = false
  categoryEdit: formPayloadEdit = {
    name: '',
    helpText: '',
    id: 0
  }
  closeDialog() {
    this.visibleCreate = false
    this.visibleEdit = false
    this.formGroup.reset()
    this.errors = {
      name: '',
      helpText: ''
    }
  }

  showDialogEdit(category: Category) {
    this.visibleEdit = true
    this.categoryEdit = category
    this.formGroup.controls.name.setValue(this.categoryEdit.name)
    this.formGroup.controls.helpText.setValue(this.categoryEdit.helpText)
  }
  confirmationDelete(event: Event, id: number, name: string) {
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
        this.toast.show('info', 'Eliminando..', 'Eliminando criterio..')
        this.onDelete(id)
      },
      reject: () => {
        this.toast.show('error', 'Rechazado', 'Haz rechazado la eliminación')
      }
    })
  }
  getCategoriesPerIndicator(indicatorId: number) {
    this.categoryService
      .getAllCategoriesByIndicatorIndex(indicatorId)
      .subscribe({
        next: (res) => {
          this.categories =
            res.status === 'success' ? res.data : this.categories
        },
        error: (e) => {
          console.error(e)
        }
      })
  }
  onDelete(id: number) {
    this.categoryService.delete(id).subscribe({
      next: () => {
        this.toast.show('success', 'Eliminado', 'Categoría eliminada con éxito')
        this.getCategoriesPerIndicator(this.indicatorIndex)
      },
      error: (e) => {
        console.error(e)
        this.toast.show('error', 'Error', e.message)
      }
    })
  }
  onCreate() {
    const { helpText, name } = this.formGroup.controls
    if (!name.value || !helpText.value) return
    const category: CategoryDTO = {
      indicatorIndex: this.indicatorIndex,
      name: name.value,
      helpText: helpText.value
    }
    this.categoryService.create(category).subscribe({
      next: () => {
        this.toast.show('success', 'Creado', 'Categoría creada con éxito')
        this.closeDialog()
        this.getCategoriesPerIndicator(this.indicatorIndex)
      },
      error: (e) => {
        this.toast.show('error', 'Error', e.message)
        this.closeDialog()
      }
    })
  }
  onEdit() {
    const { helpText, name } = this.formGroup.controls
    const category: CategoryDTO = {
      indicatorIndex: this.indicatorIndex,
      name: name.value,
      helpText: helpText.value
    }
    this.categoryService.edit(this.categoryEdit.id, category).subscribe({
      next: () => {
        this.toast.show('success', 'Creado', 'Categoría editada con éxito')
        this.closeDialog()
        this.getCategoriesPerIndicator(this.indicatorIndex)
      },
      error: (e) => {
        this.toast.show('error', 'Error', e.message)
        this.closeDialog()
      }
    })
  }
}

type formPayload = Omit<CategoryDTO, 'indicatorIndex'>
type formPayloadEdit = Omit<Category, 'indicator'>
