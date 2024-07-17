import { Component, Inject, Input } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ValidatedFormGroup } from '../../../common/validated-form-group/validated-form-group'
import { string, object } from 'yup'
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
import { VALUES } from '../../../../../../../shared/validations'
import { TooltipModule } from 'primeng/tooltip'

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
    PanelModule,
    TooltipModule
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
    const validationSchema = object({
      name: string()
        .required('El nombre es requerido')
        .max(
          VALUES.categoryNameMaxAmount,
          'El nombre no puede superar los 128 caracteres'
        )
        .min(
          VALUES.nameAliasMinAmount,
          'El nombre debe superar un mínimo de 10 caracteres'
        ),
      helpText: string()
        .required('El texto de ayuda es requerido')
        .max(
          VALUES.helpTextMaxAmount,
          'El texto de ayuda no puede superar los 128 caracteres'
        )
        .min(
          VALUES.helpTextMinAmount,
          'El texto de ayuda debe superar un mínimo de 1 caracter'
        )
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
  fetchCreateCategory: boolean = false
  fetchEditCategory: boolean = false
  categoryEdit: formPayloadEdit = {
    name: '',
    helpText: '',
    id: 0
  }
  reset() {
    this.formGroup.reset()
    this.errors = {
      name: '',
      helpText: ''
    }
  }
  closeDialog() {
    this.visibleCreate = false
    this.visibleEdit = false
    this.reset()
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
        this.toast.show('info', 'Eliminando..', 'Eliminando categoría..')
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
          if (e.error.data != null) {
            this.toast.show('error', 'Error', e.error.data.message)
          } else {
            this.toast.show('error', 'Error', e.error.message)
          }
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
        if (e.error.data != null) {
          this.toast.show('error', 'Error', e.error.data.message)
        } else {
          this.toast.show('error', 'Error', e.error.message)
        }
      }
    })
  }
  onCreate() {
    if (this.formGroup.invalid) return
    this.fetchCreateCategory = true
    const { helpText, name } = this.formGroup.controls
    if (!name.value || !helpText.value) return
    const category: CategoryDTO = {
      indicatorIndex: this.indicatorIndex,
      name: name.value,
      helpText: helpText.value
    }
    this.visibleCreate = false
    this.categoryService.create(category).subscribe({
      next: () => {
        this.fetchCreateCategory = false
        this.toast.show('success', 'Creado', 'Categoría creada con éxito')
        this.closeDialog()
        this.getCategoriesPerIndicator(this.indicatorIndex)
      },
      error: (e) => {
        this.visibleCreate = false
        this.fetchCreateCategory = false
        if (e.error.data != null) {
          this.toast.show('error', 'Error', e.error.data.message)
        } else {
          this.toast.show('error', 'Error', e.error.message)
        }
        this.closeDialog()
      }
    })
  }
  onEdit() {
    if (this.formGroup.invalid) return
    this.fetchEditCategory = true
    const { helpText, name } = this.formGroup.controls
    const category: CategoryDTO = {
      indicatorIndex: this.indicatorIndex,
      name: name.value,
      helpText: helpText.value
    }
    this.visibleEdit = false
    this.categoryService.edit(this.categoryEdit.id, category).subscribe({
      next: () => {
        this.fetchEditCategory = false
        this.toast.show('success', 'Creado', 'Categoría editada con éxito')
        this.closeDialog()
        this.getCategoriesPerIndicator(this.indicatorIndex)
      },
      error: (e) => {
        this.visibleEdit = false
        this.fetchEditCategory = false
        if (e.error.data != null) {
          this.toast.show('error', 'Error', e.error.data.message)
        } else {
          this.toast.show('error', 'Error', e.error.message)
        }
        this.closeDialog()
      }
    })
  }
}

type formPayload = Omit<CategoryDTO, 'indicatorIndex'>
type formPayloadEdit = Omit<Category, 'indicator'>
