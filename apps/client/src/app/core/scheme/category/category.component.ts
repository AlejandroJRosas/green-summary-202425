import { Component, Inject, Input } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ValidatedFormGroup } from '../../../common/validated-form-group/validated-form-group'
import * as Yup from 'yup'
import { CategoryService } from '../../../services/category.service'
import { ConfirmationService } from 'primeng/api'
import { Toast } from '../../../common/toast/toast.component'
import { InputTextModule } from 'primeng/inputtext'
import { InputTextareaModule } from 'primeng/inputtextarea'

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
export class CategoryComponent extends ValidatedFormGroup<ICategoryDTO> {
  constructor(
    @Inject(Toast) private toast: Toast,
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService
  ) {
    const initialControlValues = {
      indicatorIndex: 1,
      name: '',
      helpText: ''
    }

    const validationSchema = Yup.object({
      indicatorIndex: Yup.number()
        .min(1, 'El indice debe ser mayor o igual a 1')
        .required('El indicador es requerido'),
      name: Yup.string().required('El nombre es requerido'),
      helpText: Yup.string().required('La ayuda es requerida')
    })

    super(initialControlValues, validationSchema)
  }

  errors = {
    indicatorIndex: '',
    name: '',
    helpText: ''
  }

  @Input() category: ICategoryDTO = {
    indicatorIndex: 0,
    name: '',
    helpText: ''
  }
  @Input() visibleCreate: boolean = false
  @Input() visibleEdit: boolean = false

  closeDialog() {
    this.visibleCreate = false
    this.formGroup.reset()
    this.formGroup.controls.indicatorIndex.setValue(1)
    this.errors = {
      indicatorIndex: '',
      name: '',
      helpText: ''
    }
  }

  showDialogEdit(index: number, name: string, textHelp: string) {
    this.visibleEdit = true
    this.formGroup.controls.indicatorIndex.setValue(index)
    this.formGroup.controls.name.setValue(name)
    this.formGroup.controls.helpText.setValue(textHelp)
  }

  onEdit() {}
}

interface ICategoryDTO {
  indicatorIndex: number
  name: string
  helpText: string
}
