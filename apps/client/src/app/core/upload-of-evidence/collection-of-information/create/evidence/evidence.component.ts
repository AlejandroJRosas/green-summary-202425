import { Component } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown'
import { EvidenceDocumentComponent } from './types/evidence-document/evidence-document.component'
import { EvidenceImageComponent } from './types/evidence-image/evidence-image.component'
import { EvidenceLinkComponent } from './types/evidence-link/evidence-link.component'
import { FieldsetModule } from 'primeng/fieldset'
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
    ReactiveFormsModule
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

  typesOfEvidence = [
    { name: 'Imagen', code: 'image' },
    { name: 'Documento', code: 'document' },
    { name: 'Link', code: 'link' }
  ]
  evidences: number[] = []
  addEvidence() {
    this.evidences.push(this.evidences.length + 1)
  }
  onChange(event: DropdownChangeEvent) {
    console.log(event)
  }
}

interface typeEvidence {
  name: string
  code: string
}
