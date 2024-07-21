import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { EvidenceService } from '../../../../services/evidence/evidence.service'
import { Evidence } from '../../../../../shared/types/evidence.type'
import { ButtonModule } from 'primeng/button'
import { EvidenceDocumentComponent } from '../create/evidence/types/evidence-document/evidence-document.component'
import { EvidenceImageComponent } from '../create/evidence/types/evidence-image/evidence-image.component'
import { EvidenceLinkComponent } from '../create/evidence/types/evidence-link/evidence-link.component'

@Component({
  selector: 'app-edit-evidence',
  standalone: true,
  imports: [
    ButtonModule,
    EvidenceLinkComponent,
    EvidenceImageComponent,
    EvidenceDocumentComponent
  ],
  templateUrl: './edit-evidence.component.html',
  styles: ``
})
export class EditEvidenceComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private EvidenceService: EvidenceService
  ) {
    this.route.params.subscribe((params) => {
      this.categoryId = parseInt(params['categoryId'], 10)
      this.recopilationId = parseInt(params['recopilationId'], 10)
      ;(this.evidence.collection.id = parseInt(
        params['informationCollectionId'],
        10
      )),
        (this.evidenceId = parseInt(params['evidenceId'], 10))
    })
  }
  recopilationId: number = 0
  categoryId: number = 0
  evidenceId: number = 0
  evidence: EvidenceEdit = {
    id: 0,
    description: '',
    externalLink: '',
    fileLink: '',
    type: '',
    error: '',
    collection: {
      id: 0,
      summary: '',
      name: ''
    }
  }
  ngOnInit() {
    this.getEvidenceById()
  }
  getEvidenceById() {
    this.EvidenceService.getById(this.evidenceId).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.evidence = res.data
        }
      },
      error: (e) => {
        console.error(e)
        this.router.navigateByUrl('/404 Not Found')
      }
    })
  }
  goBack() {
    this.router.navigateByUrl(
      `pages/information-collection/recopilation/${this.recopilationId}/category/${this.categoryId}`
    )
  }
}
type EvidenceEdit = Omit<Evidence, 'collection'> & {
  collection: {
    id: number
    name: string
    summary: string
  }
}
