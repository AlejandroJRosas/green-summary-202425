import { Component, Inject, Input } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ValidatedFormGroup } from '../../../common/validated-form-group/validated-form-group'
import * as Yup from 'yup'
import {
  CategoryService,
  CreateCategoryDTO as CategoryDTO
} from '../../../services/category.service'
import { Toast } from '../../../common/toast/toast.component'
import { InputTextModule } from 'primeng/inputtext'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { Category } from '../../../../shared/types/category.type'

@Component({
  selector: 'category-form',
  standalone: true,
  imports: [
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule
  ],
  templateUrl: './category.component.html'
})
export class CategoryComponent extends ValidatedFormGroup<formPayload> {
  constructor(
    @Inject(Toast) private toast: Toast,
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

  @Input() category: formPayloadEdit = {
    name: '',
    helpText: '',
    id: 0
  }
  @Input() visibleCreate: boolean = false
  @Input() visibleEdit: boolean = false
  @Input() indicatorIndex: number = 0

  closeDialog() {
    this.visibleCreate = false
    this.visibleEdit = false
    this.formGroup.reset()
    this.errors = {
      name: '',
      helpText: ''
    }
  }

  showDialogEdit() {
    this.visibleEdit = true
    this.formGroup.controls.name.setValue(this.category.name)
    this.formGroup.controls.helpText.setValue(this.category.helpText)
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
      },
      error: (e) => {
        this.toast.show('error', 'Error', e.error.message)
      }
    })
  }
  onEdit() {
    const { helpText, name } = this.formGroup.controls
    if (!name.value || !helpText.value) return
    const category: CategoryDTO = {
      indicatorIndex: this.indicatorIndex,
      name: name.value,
      helpText: helpText.value
    }
    this.categoryService.edit(this.category.id, category).subscribe({
      next: () => {
        this.toast.show('success', 'Creado', 'Categoría creada con éxito')
        this.closeDialog()
      },
      error: (e) => {
        this.toast.show('error', 'Error', e.error.message)
      }
    })
  }
}

type formPayload = Omit<CategoryDTO, 'indicatorIndex'>
type formPayloadEdit = Omit<Category, 'indicator'>
