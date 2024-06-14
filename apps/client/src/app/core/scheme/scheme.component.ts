import { Component } from '@angular/core'
import { ConfirmationService } from 'primeng/api'
import { IndicatorsComponent } from './indicators/indicators.component'

@Component({
  selector: 'app-scheme',
  standalone: true,
  templateUrl: './scheme.component.html',
  providers: [ConfirmationService],
  imports: [IndicatorsComponent]
})
export class SchemeComponent {}
