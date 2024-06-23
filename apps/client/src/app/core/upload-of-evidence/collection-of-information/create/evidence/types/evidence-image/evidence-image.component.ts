import { Component, Inject } from '@angular/core'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload'
import { InputTextModule } from 'primeng/inputtext'
import { ImageModule } from 'primeng/image'
import { string, object } from 'yup'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ValidatedFormGroup } from '../../../../../../../common/validated-form-group/validated-form-group'
import { file } from '../../../../../../../../utils/yup-file'
import { EvidenceService } from '../../../../../../../services/evidence/evidence.service'
import { Toast } from '../../../../../../../common/toast/toast.component'

@Component({
  selector: 'evidence-image',
  standalone: true,
  imports: [
    InputTextareaModule,
    FileUploadModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ImageModule
  ],
  templateUrl: './evidence-image.component.html',
  styles: ``
})
export class EvidenceImageComponent extends ValidatedFormGroup<FormValues> {
  constructor(
    private EvidenceService: EvidenceService,
    @Inject(Toast) private toast: Toast
  ) {
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
  imageBlobUrl: string = ''
  createdEvidence: boolean = false
  removeFile: boolean = false
  errors = {
    description: '',
    externalLink: '',
    fileLink: ''
  }
  disableForm() {
    this.formGroup.get('description')?.disable()
    this.formGroup.get('externalLink')?.disable()
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
    if (event.files[0]) {
      const reader = new FileReader()
      let imageBlobUrl: string = ''

      reader.onload = () => {
        imageBlobUrl = reader.result as string
        setTimeout(() => {
          this.imageBlobUrl = imageBlobUrl
        })
      }
      reader.readAsDataURL(event.files[0])
    }
  }
  constructFormData() {
    Object.keys(this.formGroup.controls).forEach((formControlName) => {
      this.formData.append(
        formControlName,
        this.formGroup.get(formControlName)?.value
      )
    })
    this.formData.append('type', 'image')
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
            'Evidencia tipo imágen creada con éxito'
          )
          this.createdEvidence = true
          console.log(this.createdEvidence)
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
  externalLink?: string
  fileLink: File | null
}
