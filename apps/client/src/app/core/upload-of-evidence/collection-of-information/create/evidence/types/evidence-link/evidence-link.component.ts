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

@Component({
  selector: 'evidence-link',
  standalone: true,
  imports: [
    InputTextModule,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule
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
  errors = {
    description: '',
    externalLink: ''
  }
  disableForm() {
    this.formGroup.get('description')?.disable()
    this.formGroup.get('externalLink')?.disable()
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
        }
      },
      error: (e) => {
        console.error(e)
        this.toast.show('error', 'Error', e.error.data.message)
      }
    })
  }
}

type FormValues = {
  description: string
  externalLink: string
}
