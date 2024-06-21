import { Component } from '@angular/core'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { ButtonModule } from 'primeng/button'
import { EvidenceComponent } from './evidence/evidence.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { string, object } from 'yup'
import { ValidatedFormGroup } from '../../../../common/validated-form-group/validated-form-group'
import { PanelModule } from 'primeng/panel'

@Component({
  selector: 'create-collection',
  standalone: true,
  imports: [
    InputTextareaModule,
    ButtonModule,
    EvidenceComponent,
    FormsModule,
    ReactiveFormsModule,
    PanelModule
  ],
  templateUrl: './create-collection.component.html',
  styles: ``
})
export class CreateCollectionComponent extends ValidatedFormGroup<FormValues> {
  constructor() {
    const initialControlValues = {
      description: ''
    }
    const validationSchema = object({
      description: string().required('La descripción es requerida')
    })
    super(initialControlValues, validationSchema)
  }

  errors = {
    description: ''
  }
  createColletionInformation: CollectionInformationDTO = {
    description: '',
    evidences: []
  }
  evidences: number[] = []
  addEvidence() {
    this.evidences.push(this.evidences.length + 1)
  }
  onCreate() {
    this.createColletionInformation.description =
      this.formGroup.controls.description.value
    this.createColletionInformation.evidences = this.evidences
    console.log(this.createColletionInformation)
  }
}
type FormValues = {
  description: string
}
type CollectionInformationDTO = {
  description: string
  evidences: number[]
}
