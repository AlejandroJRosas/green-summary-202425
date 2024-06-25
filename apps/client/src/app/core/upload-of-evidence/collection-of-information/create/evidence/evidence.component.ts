import { Component, Input } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import { DropdownModule } from 'primeng/dropdown'
import { EvidenceDocumentComponent } from './types/evidence-document/evidence-document.component'
import { EvidenceImageComponent } from './types/evidence-image/evidence-image.component'
import { EvidenceLinkComponent } from './types/evidence-link/evidence-link.component'
import { FieldsetModule } from 'primeng/fieldset'
import { ActivatedRoute } from '@angular/router'
import { PanelModule } from 'primeng/panel'
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DataSharingEvidenceService } from '../../../../../services/evidence/data-sharing-evidence.service'

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
  constructor(
    private route: ActivatedRoute,
    public DataSharingEvidence: DataSharingEvidenceService
  ) {
    this.route.params.subscribe((params) => {
      this.informationCollectionId = params['informationCollectionId']
    })
  }
  readonly: boolean = false
  edit: boolean = false
  delete: boolean = false
  informationCollectionId: string = ''
  disableSelect: boolean = false
  type = 'image'
  @Input() index: number = 0
  typesOfEvidence = [
    { name: 'Imagen', code: 'image' },
    { name: 'Documento', code: 'document' },
    { name: 'Link', code: 'link' }
  ]
  getFormGroup(evidence: number): FormGroup {
    return this.DataSharingEvidence.getFormGroupByEvidence(evidence)
  }
  addEvidence() {
    this.DataSharingEvidence.addEvidence()
  }
  changeDisableSelect(disable: boolean) {
    this.disableSelect = disable
  }
}
