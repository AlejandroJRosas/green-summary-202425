import { Component, EventEmitter, Inject, Input, Output } from '@angular/core'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { string, object } from 'yup'
import { ValidatedFormGroup } from '../../../../../../../common/validated-form-group/validated-form-group'
import { file } from '../../../../../../../../utils/yup-file'
import { EvidenceService } from '../../../../../../../services/evidence/evidence.service'
import { Toast } from '../../../../../../../common/toast/toast.component'
import { PanelModule } from 'primeng/panel'
import { VALUES } from '../../../../../../../../../../../shared/validations'
import { DataSharingEvidenceService } from '../../../../../../../services/evidence/data-sharing-evidence.service'

@Component({
  selector: 'evidence-document',
  standalone: true,
  imports: [
    InputTextareaModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    PanelModule
  ],
  templateUrl: './evidence-document.component.html',
  styles: ``
})
export class EvidenceDocumentComponent extends ValidatedFormGroup<FormValues> {
  constructor(
    private EvidenceService: EvidenceService,
    @Inject(Toast) private toast: Toast,
    private DataSharingEvidence: DataSharingEvidenceService
  ) {
    const initialControlValues = {
      description: '',
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
      fileLink: file().required('El documento es requerido')
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
  @Input() index: number = 0
  @Output() disableSelect = new EventEmitter<boolean>()
  errors = {
    description: '',
    fileLink: ''
  }
  disableForm() {
    this.formGroup.get('description')?.disable()
    this.formGroup.get('fileLink')?.disable()
    this.disableUploadFile = true
  }
  enableForm() {
    this.formGroup.get('description')?.enable()
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
      this.errors.fileLink = 'Debes seleccionar un documento para subir.'
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
    this.formData.append('collectionId', this.informationCollectionId)
  }
  constructFormDataEdit() {
    Object.keys(this.formGroup.controls).forEach((formControlName) => {
      this.formDataEdit.append(
        formControlName,
        this.formGroup.get(formControlName)?.value
      )
    })
    this.formData.append('type', 'document')
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
          this.evidenceId = res.data.id
          this.disableSelect.emit(true)
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
            'Evidencia tipo documento editado con éxito'
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
          'Evidencia tipo documento eliminado con éxito'
        )
        this.DataSharingEvidence.removeEvidence(this.index)
        this.disableSelect.emit(false)
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
  fileLink: File | null
}
