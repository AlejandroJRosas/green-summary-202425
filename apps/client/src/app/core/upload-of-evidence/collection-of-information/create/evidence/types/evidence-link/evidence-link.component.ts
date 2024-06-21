import { Component, EventEmitter, Output } from '@angular/core'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { InputTextModule } from 'primeng/inputtext'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ValidatedFormGroup } from '../../../../../../../common/validated-form-group/validated-form-group'
import { string, object } from 'yup'

@Component({
  selector: 'evidence-link',
  standalone: true,
  imports: [
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './evidence-link.component.html',
  styles: ``
})
export class EvidenceLinkComponent extends ValidatedFormGroup<FormValues> {
  constructor() {
    const initialControlValues = {
      description: '',
      externalLink: ''
    }
    const validationSchema = object({
      description: string().required('La descripción es requerida'),
      externalLink: string()
        .url('El formato debe ser de tipo URL')
        .required('El link es requerido')
    })
    super(initialControlValues, validationSchema)
  }
  errors = {
    description: '',
    externalLink: ''
  }
  @Output()
  spreadFormGroup = new EventEmitter<FormGroup>()
  onSpread() {
    this.spreadFormGroup.emit(this.formGroup)
  }
}

type FormValues = {
  description: string
  externalLink: string
}
