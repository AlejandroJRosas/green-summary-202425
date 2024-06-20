import { Component } from '@angular/core'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { string, object } from 'yup'
import { ValidatedFormGroup } from '../../../../../../../common/validated-form-group/validated-form-group'
import { file } from '../../../../../../../../utils/yup-file'

@Component({
  selector: 'evidence-document',
  standalone: true,
  imports: [
    InputTextareaModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './evidence-document.component.html',
  styles: ``
})
export class EvidenceDocumentComponent extends ValidatedFormGroup<FormValues> {
  constructor() {
    const initialControlValues = {
      description: '',
      fileLink: null
    }
    const validationSchema = object({
      description: string().required('La descripción es requerida'),
      fileLink: file().required('El documento es requerido')
    })
    super(initialControlValues, validationSchema)
  }
  formData = new FormData()
  errors = {
    description: '',
    fileLink: ''
  }
  onRemove() {
    if (this.formGroup.controls.fileLink.value) {
      this.errors.fileLink = 'Debes seleccionar una documento para subir.'
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
  fileLink: File | null
}
