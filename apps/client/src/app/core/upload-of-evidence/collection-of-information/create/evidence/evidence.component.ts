import { Component, Input } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { DropdownModule } from 'primeng/dropdown'
import { EvidenceDocumentComponent } from './types/evidence-document/evidence-document.component'
import { EvidenceImageComponent } from './types/evidence-image/evidence-image.component'
import { EvidenceLinkComponent } from './types/evidence-link/evidence-link.component'
import { FieldsetModule } from 'primeng/fieldset'
import { PanelModule } from 'primeng/panel'
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms'

@Component({
  selector: 'evidence',
  standalone: true,
  imports: [
    ButtonModule,
    DropdownModule,
    EvidenceDocumentComponent,
    EvidenceImageComponent,
    EvidenceLinkComponent,
    FieldsetModule,
    FormsModule,
    ReactiveFormsModule,
    PanelModule
  ],
  templateUrl: './evidence.component.html',
  styles: ``
})
export class EvidenceComponent {
  formGroup = new FormGroup({
    selectedType: new FormControl<typeEvidence>({
      name: '',
      code: ''
    })
  })
  readonly: boolean = false
  edit: boolean = false
  delete: boolean = false
  @Input() index: number = 0
  typesOfEvidence = [
    { name: 'Imagen', code: 'image' },
    { name: 'Documento', code: 'document' },
    { name: 'Link', code: 'link' }
  ]
  evidences: number[] = []
  addEvidence() {
    this.evidences.push(this.evidences.length + 1)
  }
  onDelete(indexEvidence: number) {
    this.evidences = this.evidences.filter(
      (_, index) => index !== indexEvidence
    )
  }
}

interface typeEvidence {
  name: string
  code: string
}
