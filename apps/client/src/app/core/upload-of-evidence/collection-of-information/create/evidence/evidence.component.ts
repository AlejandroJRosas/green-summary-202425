import { Component, Inject, Input, OnInit } from '@angular/core'
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
import { Toast } from '../../../../../common/toast/toast.component'
import { DetailedRecopilation } from '../../../../../services/recopilation.service'
import { RecopilationService } from '../../../../../services/recopilation.service'

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
export class EvidenceComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public DataSharingEvidence: DataSharingEvidenceService,
    @Inject(Toast) private toast: Toast,
    private RecopilationService: RecopilationService
  ) {
    this.route.params.subscribe((params) => {
      this.informationCollectionId = params['informationCollectionId']
      this.recopilationId = parseInt(params['recopilationId'], 10)
    })
  }
  readonly: boolean = false
  edit: boolean = false
  delete: boolean = false
  informationCollectionId: string = ''
  disableSelect: boolean = false
  recopilationId: number = 0
  type = 'image'
  isValidDepartmentalDate: boolean = false
  detailedRecopilation: DetailedRecopilation | null = null
  currentDate = new Date()
  @Input() index: number = 0
  typesOfEvidence = [
    { name: 'Imagen', code: 'image' },
    { name: 'Documento', code: 'document' },
    { name: 'Link', code: 'link' }
  ]
  ngOnInit(): void {
    this.getRecopilationById()
  }
  getFormGroup(evidence: number): FormGroup {
    return this.DataSharingEvidence.getFormGroupByEvidence(evidence)
  }
  addEvidence() {
    this.DataSharingEvidence.addEvidence()
  }
  changeDisableSelect(disable: boolean) {
    this.disableSelect = disable
  }
  getRecopilationById() {
    this.RecopilationService.getById(this.recopilationId).subscribe({
      next: (res) => {
        if (res) {
          this.detailedRecopilation = res
          if (
            this.currentDate <= this.detailedRecopilation?.departmentEndDate
          ) {
            this.isValidDepartmentalDate = true
          } else {
            this.toast.show(
              'warn',
              'Cierre de Subidas de Información',
              'El periodo de subida de información ha finalizado. Ya no se podrán subir nuevas colecciones de información ni evidencias.'
            )
          }
        }
      },
      error: (e) => {
        console.error(e)
      }
    })
  }
}
