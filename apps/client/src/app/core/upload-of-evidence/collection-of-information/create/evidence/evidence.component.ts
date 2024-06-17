import { Component } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { DropdownModule } from 'primeng/dropdown'
import { EvidenceDocumentComponent } from './types/evidence-document/evidence-document.component'
import { EvidenceImageComponent } from './types/evidence-image/evidence-image.component'
import { EvidenceLinkComponent } from './types/evidence-link/evidence-link.component'
import { FieldsetModule } from 'primeng/fieldset'

@Component({
  selector: 'evidence',
  standalone: true,
  imports: [
    ButtonModule,
    DropdownModule,
    EvidenceDocumentComponent,
    EvidenceImageComponent,
    EvidenceLinkComponent,
    FieldsetModule
  ],
  templateUrl: './evidence.component.html',
  styles: ``
})
export class EvidenceComponent {
  typesOfEvidence = [
    { name: 'Imagen', code: 'image' },
    { name: 'Documento', code: 'document' },
    { name: 'Link', code: 'link' }
  ]
  selectedType = 'document'
  evidences: number[] = []
  addEvidence() {
    this.evidences.push(this.evidences.length + 1)
  }
}
