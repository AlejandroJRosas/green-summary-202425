import { Component, Inject } from '@angular/core'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { InputTextModule } from 'primeng/inputtext'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ValidatedFormGroup } from '../../../../../../../common/validated-form-group/validated-form-group'
import { ButtonModule } from 'primeng/button'
import { string, object } from 'yup'
import { EvidenceDTO } from '../../../../../../../services/evidence/evidence.service'
import { Toast } from '../../../../../../../common/toast/toast.component'
import { LinkEvidenceService } from '../../../../../../../services/evidence/link-evidence.service'
import { PanelModule } from 'primeng/panel'

@Component({
  selector: 'evidence-link',
  standalone: true,
  imports: [
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    PanelModule
  ],
  templateUrl: './evidence-link.component.html',
  styles: ``
})
export class EvidenceLinkComponent extends ValidatedFormGroup<FormValues> {
  constructor(
    @Inject(Toast) private toast: Toast,
    private LinkEvidenceService: LinkEvidenceService
  ) {
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
  createdEvidence: boolean = false
  editedEvience: boolean = false
  evidenceId: number = 0
  errors = {
    description: '',
    externalLink: ''
  }
  disableForm() {
    this.formGroup.get('description')?.disable()
    this.formGroup.get('externalLink')?.disable()
  }
  enableForm() {
    this.formGroup.get('description')?.enable()
    this.formGroup.get('externalLink')?.enable()
  }
  onCreate() {
    if (this.formGroup.invalid) return
    const { description, externalLink } = this.formGroup.controls
    const evidenceLink: EvidenceDTO = {
      description: description.value,
      error: 'error',
      type: 'link',
      externalLink: externalLink.value,
      fileLink: null,
      collectionId: '12'
    }
    this.LinkEvidenceService.create(evidenceLink).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toast.show(
            'success',
            'Creado',
            'Evidencia tipo link creada con éxito'
          )
          this.createdEvidence = true
          this.disableForm()
          this.evidenceId = res.data.id
        }
      },
      error: (e) => {
        console.error(e)
        this.toast.show('error', 'Error', e.error.data.message)
      }
    })
  }
  onEdit() {
    if (this.formGroup.invalid) return
    const { description, externalLink } = this.formGroup.controls
    const evidenceLink: EvidenceDTO = {
      description: description.value,
      error: 'error',
      type: 'link',
      externalLink: externalLink.value,
      fileLink: null,
      collectionId: '12'
    }
    this.LinkEvidenceService.edit(this.evidenceId, evidenceLink).subscribe({
      next: () => {
        this.toast.show(
          'success',
          'Editado',
          'Colección de información editado con éxito'
        )
        this.editedEvience = true
        this.disableForm()
      },
      error: (e) => {
        this.toast.show('error', 'Error', e.error.data.message)
      }
    })
  }
  onDelete() {
    this.LinkEvidenceService.delete(this.evidenceId).subscribe({
      next: () => {
        this.toast.show(
          'success',
          'Creado',
          'Evidencia tipo link eliminada con éxito'
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
  externalLink: string
}
