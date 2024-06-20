import { Component } from '@angular/core'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload'
import { InputTextModule } from 'primeng/inputtext'
import { string, object } from 'yup'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ValidatedFormGroup } from '../../../../../../../common/validated-form-group/validated-form-group'
import { file } from '../../../../../../../../utils/yup-file'

@Component({
  selector: 'evidence-image',
  standalone: true,
  imports: [
    InputTextareaModule,
    FileUploadModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './evidence-image.component.html',
  styles: ``
})
export class EvidenceImageComponent extends ValidatedFormGroup<FormValues> {
  constructor() {
    const initialControlValues = {
      description: '',
      externalLink: '',
      fileLink: null
    }
    const validationSchema = object({
      description: string().required('La descripción es requerida'),
      externalLink: string().url('El formato debe ser de tipo URL').optional(),
      fileLink: file().required('La imagen es requerida')
    })
    super(initialControlValues, validationSchema)
  }
  formData = new FormData()
  errors = {
    description: '',
    externalLink: '',
    fileLink: ''
  }
  onRemove() {
    if (this.formGroup.controls.fileLink.value) {
      this.errors.fileLink = 'Debes seleccionar una imagen para subir.'
      return
    }
  }
  onSelect(event: FileSelectEvent) {
    this.formGroup.controls.fileLink.setValue(event.files[0])
  }
  submitForm() {
    Object.keys(this.formGroup.controls).forEach((formControlName) => {
      this.formData.append(
        formControlName,
        this.formGroup.get(formControlName)?.value
      )
    })
  }
}
type FormValues = {
  description: string
  externalLink?: string
  fileLink: File | null
}
