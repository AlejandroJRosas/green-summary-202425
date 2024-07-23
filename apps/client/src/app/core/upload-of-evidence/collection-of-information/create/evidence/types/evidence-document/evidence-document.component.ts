import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output
} from '@angular/core'
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
import { ActivatedRoute, Router } from '@angular/router'
import { Evidence } from '../../../../../../../../shared/types/evidence.type'

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
export class EvidenceDocumentComponent
  extends ValidatedFormGroup<FormValues>
  implements OnInit
{
  constructor(
    private EvidenceService: EvidenceService,
    @Inject(Toast) private toast: Toast,
    private DataSharingEvidence: DataSharingEvidenceService,
    private route: ActivatedRoute,
    private router: Router
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
    this.route.params.subscribe((params) => {
      this.categoryId = parseInt(params['categoryId'], 10)
      this.recopilationId = parseInt(params['recopilationId'], 10)
    })
  }
  formData = new FormData()
  formDataEdit = new FormData()
  formDataWithoutFileLink = new FormData()
  createdEvidence: boolean = false
  removeFile: boolean = false
  editedEvience: boolean = false
  evidenceId: number = 0
  enableEdit: boolean = false
  disableUploadFile: boolean = false
  categoryId: number = 0
  recopilationId: number = 0
  nameFileByUrl: string = ''
  initialValueEdit: boolean = false
  @Input() informationCollectionId: string = ''
  @Input() index: number = 0
  @Output() disableSelect = new EventEmitter<boolean>()
  @Input() edit: boolean = false
  @Input() evidence: EvidenceEdit = {
    id: 0,
    description: '',
    externalLink: '',
    fileLink: '',
    type: 'document',
    error: 'no error',
    collection: {
      id: 0,
      summary: '',
      name: ''
    }
  }
  errors = {
    description: '',
    fileLink: ''
  }
  ngOnInit() {
    if (this.edit) {
      this.initialValueEdit = true
      this.enableEdit = true
      this.evidenceId = this.evidence.id
      if (this.evidence.fileLink !== null) {
        this.nameFileByUrl = this.getFileNameByUrl(this.evidence.fileLink)
      } else {
        this.nameFileByUrl = ''
      }
      this.formGroup.controls.description.setValue(this.evidence.description)
    }
  }
  getFileNameByUrl(url: string) {
    const parts = url.split('/')
    const nameFile = parts[parts.length - 1]
    return nameFile
  }
  enableEditButton() {
    this.enableEdit = true
    this.editedEvience = false
  }
  disableForm() {
    this.formGroup.get('description')?.disable()
    this.formGroup.get('fileLink')?.disable()
    this.disableUploadFile = true
  }
  enableForm() {
    this.enableEditButton()
    this.formGroup.get('description')?.enable()
    this.formGroup.get('fileLink')?.enable()
    this.disableUploadFile = false
    this.createdEvidence = false
  }
  onRemove() {
    this.initialValueEdit = false
    this.removeFile = true
    this.formGroup.controls.fileLink.setValue(null)
    this.errors.fileLink = 'Debes seleccionar un documento para subir.'
  }
  onSelect(event: FileSelectEvent) {
    this.initialValueEdit = false
    this.removeFile = false
    this.errors.fileLink = ''
    this.formGroup.controls.fileLink.setValue(event.files[0])
  }
  constructFormData() {
    Object.keys(this.formGroup.controls).forEach((formControlName) => {
      this.formData.set(
        formControlName,
        this.formGroup.get(formControlName)?.value
      )
    })
    this.formData.set('type', 'document')
    this.formData.set('collectionId', this.informationCollectionId)
  }
  constructFormDataEdit() {
    Object.keys(this.formGroup.controls).forEach((formControlName) => {
      this.formDataEdit.set(
        formControlName,
        this.formGroup.get(formControlName)?.value
      )
    })
    this.formDataEdit.set('type', 'document')
  }
  constructFormDataWithoutFileLink() {
    Object.keys(this.formGroup.controls).forEach((formControlName) => {
      if (formControlName !== 'fileLink') {
        this.formDataWithoutFileLink.set(
          formControlName,
          this.formGroup.get(formControlName)?.value
        )
      }
    })
    this.formDataWithoutFileLink.set('type', 'document')
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
        if (e.error.data != null) {
          this.toast.show('error', 'Error', e.error.data.message)
        } else {
          this.toast.show('error', 'Error', e.error.message)
        }
        this.createdEvidence = false
      }
    })
  }
  onEdit() {
    if (this.initialValueEdit) {
      this.constructFormDataWithoutFileLink()
      this.EvidenceService.edit(
        this.evidenceId,
        this.formDataWithoutFileLink
      ).subscribe({
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
          if (e.error.data != null) {
            this.toast.show('error', 'Error', e.error.data.message)
          } else {
            this.toast.show('error', 'Error', e.error.message)
          }
          this.editedEvience = false
        }
      })
    } else {
      if (this.formGroup.invalid) {
        return
      }
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
          if (e.error.data != null) {
            this.toast.show('error', 'Error', e.error.data.message)
          } else {
            this.toast.show('error', 'Error', e.error.message)
          }
          this.editedEvience = false
        }
      })
    }
  }
  onDelete() {
    this.EvidenceService.delete(this.evidenceId).subscribe({
      next: () => {
        this.toast.show(
          'success',
          'Creado',
          'Evidencia tipo documento eliminado con éxito'
        )
        if (this.edit) {
          this.redirect()
        }
        this.DataSharingEvidence.removeEvidence(this.index)
        this.disableSelect.emit(false)
      },
      error: (e) => {
        this.editedEvience = false
        if (e.error.data != null) {
          this.toast.show('error', 'Error', e.error.data.message)
        } else {
          this.toast.show('error', 'Error', e.error.message)
        }
      }
    })
  }
  redirect() {
    this.router.navigateByUrl(
      `pages/information-collection/${this.recopilationId}/${this.categoryId}`
    )
  }
}

type FormValues = {
  description: string
  fileLink: File | null
}
type EvidenceEdit = Omit<Evidence, 'collection'> & {
  collection: {
    id: number
    name: string
    summary: string
  }
}
