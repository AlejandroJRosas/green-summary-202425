import { Component, Inject, Input, OnInit } from '@angular/core'
import { PanelModule } from 'primeng/panel'
import { ActivatedRoute, Router } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ValidatedFormGroup } from '../../../common/validated-form-group/validated-form-group'
import { string, object } from 'yup'
import {
  InformationCollectionDTO,
  InformationCollectionService
} from '../../../services/information-collection.service'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { Toast } from '../../../common/toast/toast.component'
import { InformationCollection } from '../../../../shared/types/information-collection.type'

@Component({
  selector: 'collection-of-information',
  standalone: true,
  imports: [
    PanelModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextareaModule
  ],
  templateUrl: './collection-of-information.component.html',
  styles: ``
})
export class CollectionOfInformationComponent
  extends ValidatedFormGroup<InformationCollectionDTO>
  implements OnInit
{
  constructor(
    @Inject(Toast) private toast: Toast,
    private currentRoute: ActivatedRoute,
    private router: Router,
    private InformationCollectionService: InformationCollectionService
  ) {
    const initialControlValues = {
      summary: ''
    }
    const validationSchema = object({
      summary: string().required('La descripción es requerida')
    })
    super(initialControlValues, validationSchema)
  }
  errors = {
    summary: ''
  }
  paginated = {
    first: 0,
    rows: 100
  }
  informationCollections: InformationCollection[] = []
  @Input() indicatorName = ''
  @Input() categoryName = ''
  currentUrl = ''
  visibleCreate: boolean = false
  ngOnInit() {
    this.getAll()
  }
  reset() {
    this.formGroup.reset()
    this.errors = {
      summary: ''
    }
  }
  closeDialog() {
    this.visibleCreate = false
    this.reset()
  }
  getAll() {
    this.InformationCollectionService.getAll(this.paginated).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.informationCollections = res.data.items
        }
      },
      error: (e) => {
        console.error(e)
        this.toast.show('error', 'Error', e.error.data.message)
      }
    })
  }
  onCreate() {
    if (this.formGroup.invalid) return
    const { summary } = this.formGroup.controls
    const collectionOfInformation: InformationCollectionDTO = {
      summary: summary.value
    }
    this.InformationCollectionService.create(collectionOfInformation).subscribe(
      {
        next: (res) => {
          if (res.status === 'success') {
            this.toast.show(
              'success',
              'Creado',
              'Colección de información creado con éxito'
            )
            this.closeDialog()
          }
        },
        error: (e) => {
          console.error(e)
          this.toast.show('error', 'Error', e.error.data.message)
          this.closeDialog()
        }
      }
    )
  }
  createCollectionInformation() {
    this.visibleCreate = true
    // this.currentRoute.url.subscribe((url) => {
    //   this.currentUrl = url.map((segment) => segment.path).join('/')
    // })
    // this.router.navigateByUrl(`pages/create/${this.currentUrl}`)
  }
}
