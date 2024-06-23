import { Component, Inject } from '@angular/core'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { string, object } from 'yup'
import { ValidatedFormGroup } from '../../../../../../../common/validated-form-group/validated-form-group'
import { file } from '../../../../../../../../utils/yup-file'
import { EvidenceService } from '../../../../../../../services/evidence/evidence.service'
import { Toast } from '../../../../../../../common/toast/toast.component'

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
  constructor(
    private EvidenceService: EvidenceService,
    @Inject(Toast) private toast: Toast
  ) {
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
  imageBlobUrl: string = ''
  createdEvidence: boolean = false
  removeFile: boolean = false
  errors = {
    description: '',
    fileLink: ''
  }
  disableForm() {
    this.formGroup.get('description')?.disable()
    this.formGroup.get('fileLink')?.disable()
  }
  onRemove() {
    if (this.formGroup.controls.fileLink.value) {
      this.removeFile = true
      this.formGroup.controls.fileLink.setValue(null)
      this.errors.fileLink = 'Debes seleccionar una imagen para subir.'
      return
    }
  }
  onSelect(event: FileSelectEvent) {
    this.removeFile = false
    this.errors.fileLink = ''
    this.formGroup.controls.fileLink.setValue(event.files[0])
  }
  constructFormData() {
    Object.keys(this.formGroup.controls).forEach((formControlName) => {
      this.formData.append(
        formControlName,
        this.formGroup.get(formControlName)?.value
      )
    })
    this.formData.append('type', 'document')
    this.formData.append('collectionId', '12')
  }
  onCreate() {
    if (this.formGroup.invalid) return
    this.constructFormData()
    this.EvidenceService.create(this.formData).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toast.show(
            'success',
            'Creado',
            'Evidencia tipo documento creado con éxito'
          )
          this.createdEvidence = true
          this.disableForm()
        }
      },
      error: (e) => {
        console.error(e)
        this.toast.show('error', 'Error', e.error.data.message)
        this.createdEvidence = false
      }
    })
  }
}

type FormValues = {
  description: string
  fileLink: File | null
}
