import { Component, Inject, OnInit } from '@angular/core'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { ButtonModule } from 'primeng/button'
import { EvidenceComponent } from './evidence/evidence.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { string, object } from 'yup'
import { ValidatedFormGroup } from '../../../../common/validated-form-group/validated-form-group'
import { PanelModule } from 'primeng/panel'
import { ActivatedRoute, Router } from '@angular/router'
import { InformationCollectionService } from '../../../../services/information-collection.service'
import { InformationCollection } from '../../../../../shared/types/information-collection.type'
import { Toast } from '../../../../common/toast/toast.component'

@Component({
  selector: 'create-evidences',
  standalone: true,
  imports: [
    InputTextareaModule,
    ButtonModule,
    EvidenceComponent,
    FormsModule,
    ReactiveFormsModule,
    PanelModule
  ],
  templateUrl: './create-evidences.component.html',
  styles: ``
})
export class CreateEvidencesComponent
  extends ValidatedFormGroup<FormValues>
  implements OnInit
{
  constructor(
    @Inject(Toast) private toast: Toast,
    private route: ActivatedRoute,
    private router: Router,
    private InformationCollectionService: InformationCollectionService
  ) {
    const initialControlValues = {
      description: ''
    }
    const validationSchema = object({
      description: string().required('La descripción es requerida')
    })
    super(initialControlValues, validationSchema)
    this.route.params.subscribe((params) => {
      this.categoryId = parseInt(params['categoryId'], 10)
      this.recopilationId = parseInt(params['recopilationId'], 10)
      this.informationCollection.id = parseInt(
        params['informationCollectionId'],
        10
      )
    })
  }
  currentUrl = ''
  errors = {
    description: ''
  }
  createColletionInformation: CollectionInformationDTO = {
    description: '',
    evidences: []
  }
  evidences: number[] = []
  recopilationId: number = 0
  categoryId: number = 0
  informationCollection: InformationCollection = {
    id: 0,
    summary: '',
    name: '',
    evidences: [],
    recopilationId: 0,
    categoryId: 0,
    departmentId: 0
  }

  ngOnInit() {
    this.getInformationCollectionById()
  }

  getInformationCollectionById() {
    this.InformationCollectionService.getById(
      this.informationCollection.id
    ).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.informationCollection = res.data
        }
      },
      error: (e) => {
        console.error(e)
        this.router.navigateByUrl('/404 Not Found')
      }
    })
  }
  addEvidence() {
    this.evidences.push(this.evidences.length + 1)
  }
  onCreate() {
    this.createColletionInformation.description =
      this.formGroup.controls.description.value
    this.createColletionInformation.evidences = this.evidences
    console.log(this.createColletionInformation)
  }
  goBack() {
    this.router.navigateByUrl(
      `pages/information-collection/recopilation/${this.recopilationId}/category/${this.categoryId}`
    )
  }
}
type FormValues = {
  description: string
}
type CollectionInformationDTO = {
  description: string
  evidences: number[]
}
