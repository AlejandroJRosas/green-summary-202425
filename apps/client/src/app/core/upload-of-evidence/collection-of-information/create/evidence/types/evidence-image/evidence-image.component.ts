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
import { DataSharingEvidenceService } from '../../../../../../../services/evidence/data-sharing-evidence.service'
import { ActivatedRoute, Router } from '@angular/router'
import { Evidence } from '../../../../../../../../shared/types/evidence.type'

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
export class EvidenceImageComponent
  extends ValidatedFormGroup<FormValues>
  implements OnInit
{
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private EvidenceService: EvidenceService,
    private DataSharingEvidence: DataSharingEvidenceService,
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
    this.route.params.subscribe((params) => {
      this.categoryId = parseInt(params['categoryId'], 10)
      this.recopilationId = parseInt(params['recopilationId'], 10)
    })
  }
  formData = new FormData()
  formDataEdit = new FormData()
  formDataWithoutFileLink = new FormData()
  imageBlobUrl: string = ''
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
  @Input() edit: boolean = false
  @Output() disableSelect = new EventEmitter<boolean>()
  @Input() evidence: EvidenceEdit = {
    id: 0,
    description: '',
    externalLink: '',
    fileLink: '',
    type: 'link',
    error: '',
    collection: {
      id: 0,
      summary: '',
      name: ''
    }
  }
  errors = {
    description: '',
    externalLink: '',
    fileLink: ''
  }
  ngOnInit() {
    if (this.edit) {
      this.initialValueEdit = true
      this.enableEdit = true
      this.evidenceId = this.evidence.id
      if (this.evidence.fileLink !== null) {
        this.imageBlobUrl = this.evidence.fileLink
        this.nameFileByUrl = this.getFileNameByUrl(this.imageBlobUrl)
      } else {
        this.imageBlobUrl = ''
      }
      this.formGroup.controls.description.setValue(this.evidence.description)
      if (this.evidence.externalLink !== null) {
        this.formGroup.controls.externalLink?.setValue(
          this.evidence.externalLink
        )
      } else {
        this.formGroup.controls.externalLink?.setValue('')
      }
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
    this.formGroup.get('externalLink')?.disable()
    this.formGroup.get('fileLink')?.disable()
    this.disableUploadFile = true
  }
  enableForm() {
    this.enableEditButton()
    this.formGroup.get('description')?.enable()
    this.formGroup.get('externalLink')?.enable()
    this.formGroup.get('fileLink')?.enable()
    this.disableUploadFile = false
    this.createdEvidence = false
  }
  onRemove() {
    this.initialValueEdit = false
    this.removeFile = true
    this.formGroup.controls.fileLink.setValue(null)
    this.errors.fileLink = 'Debes seleccionar una imagen para subir.'
  }
  onSelect(event: FileSelectEvent) {
    this.initialValueEdit = false
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
      this.formData.set(
        formControlName,
        this.formGroup.get(formControlName)?.value
      )
    })
    this.formData.set('type', 'image')
    this.formData.set('collectionId', this.informationCollectionId)
  }
  constructFormDataEdit() {
    Object.keys(this.formGroup.controls).forEach((formControlName) => {
      this.formDataEdit.set(
        formControlName,
        this.formGroup.get(formControlName)?.value
      )
    })
    this.formDataEdit.set('type', 'image')
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
    this.formDataWithoutFileLink.set('type', 'image')
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
  }
  onDelete() {
    this.EvidenceService.delete(this.evidenceId).subscribe({
      next: () => {
        this.toast.show(
          'success',
          'Creado',
          'Evidencia tipo imagen eliminada con éxito'
        )
        if (this.edit) {
          this.redirect()
        }
        this.disableSelect.emit(false)
        this.DataSharingEvidence.removeEvidence(this.index)
      },
      error: (e) => {
        console.error(e)
        this.editedEvience = false
        this.toast.show('error', 'Error', e.error.data.message)
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
  externalLink?: string
  fileLink: File | null
}
type EvidenceEdit = Omit<Evidence, 'collection'> & {
  collection: {
    id: number
    name: string
    summary: string
  }
}
