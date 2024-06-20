import { Component } from '@angular/core'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { ButtonModule } from 'primeng/button'
import { EvidenceComponent } from './evidence/evidence.component'

@Component({
  selector: 'create-collection',
  standalone: true,
  imports: [InputTextareaModule, ButtonModule, EvidenceComponent],
  templateUrl: './create-collection.component.html',
  styles: ``
})
export class CreateCollectionComponent {
  evidences: number[] = []
  addEvidence() {
    this.evidences.push(this.evidences.length + 1)
  }
}
