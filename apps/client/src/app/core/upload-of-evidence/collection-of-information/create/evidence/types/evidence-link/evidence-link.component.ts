import { Component } from '@angular/core'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { InputTextModule } from 'primeng/inputtext'

@Component({
  selector: 'evidence-link',
  standalone: true,
  imports: [InputTextModule, InputTextareaModule],
  templateUrl: './evidence-link.component.html',
  styles: ``
})
export class EvidenceLinkComponent {}
