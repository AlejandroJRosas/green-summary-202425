import { Component, Inject, Input } from '@angular/core'
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
import { PanelModule } from 'primeng/panel'
import { VALUES } from '../../../../../../../../../../../shared/validations'

@Component({
  selector: 'evidence-image',
  standalone: true,
  imports: [
    InputTextareaModule,
    FileUploadModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ImageModule,
    PanelModule
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
      description: string()
        .required('La descripción es requerida')
        .max(
          VALUES.descriptionMaxAmount,
          'La descripción no debe superar los 280 caracteres'
        )
        .min(
          VALUES.descriptionMinAmount,
          'La descripción debe superar un mínimo de 30 caracteres'
        ),
      externalLink: string().url('El formato debe ser de tipo URL').optional(),
      fileLink: file().required('La imagen es requerida')
    })
    super(initialControlValues, validationSchema)
  }
  formData = new FormData()
  formDataEdit = new FormData()
  imageBlobUrl: string = ''
  createdEvidence: boolean = false
  removeFile: boolean = false
  editedEvience: boolean = false
  evidenceId: number = 0
  enableEdit: boolean = false
  disableUploadFile: boolean = false
  @Input() informationCollectionId: string = ''
  errors = {
    description: '',
    externalLink: '',
    fileLink: ''
  }
  disableForm() {
    this.formGroup.get('description')?.disable()
    this.formGroup.get('externalLink')?.disable()
    this.formGroup.get('fileLink')?.disable()
    this.disableUploadFile = true
  }
  enableForm() {
    this.formGroup.get('description')?.enable()
    this.formGroup.get('externalLink')?.enable()
    this.formGroup.get('fileLink')?.enable()
    this.disableUploadFile = false
  }
  enableformEdit() {
    this.enableEdit = true
    this.enableForm()
    this.createdEvidence = false
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
    console.log(this.formGroup.controls.fileLink.value)
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
    this.formData.append('collectionId', this.informationCollectionId)
  }
  constructFormDataEdit() {
    Object.keys(this.formGroup.controls).forEach((formControlName) => {
      this.formDataEdit.append(
        formControlName,
        this.formGroup.get(formControlName)?.value
      )
    })
    this.formData.append('type', 'image')
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
            'Evidencia tipo imagen creada con éxito'
          )
          this.createdEvidence = true
          this.disableForm()
          this.evidenceId = res.data.id
        }
      },
      error: (e) => {
        console.error(e)
        this.toast.show('error', 'Error', e.error.data.message)
        this.createdEvidence = false
      }
    })
  }
  onEdit() {
    if (this.formGroup.invalid) return
    this.constructFormDataEdit()
    this.EvidenceService.edit(this.evidenceId, this.formDataEdit).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toast.show(
            'success',
            'Creado',
            'Evidencia tipo imagen editada con éxito'
          )
          this.editedEvience = true
          this.disableForm()
        }
      },
      error: (e) => {
        console.error(e)
        this.toast.show('error', 'Error', e.error.data.message)
        this.editedEvience = false
      }
    })
  }
  onDelete() {
    this.EvidenceService.delete(this.evidenceId).subscribe({
      next: () => {
        this.toast.show(
          'success',
          'Creado',
          'Evidencia tipo imagen eliminada con éxito'
        )
      },
      error: (e) => {
        console.error(e)
        this.editedEvience = false
        this.toast.show('error', 'Error', e.error.data.message)
      }
    })
  }
}
type FormValues = {
  description: string
  externalLink?: string
  fileLink: File | null
}
