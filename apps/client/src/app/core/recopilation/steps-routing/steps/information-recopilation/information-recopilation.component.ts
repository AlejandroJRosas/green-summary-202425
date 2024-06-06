import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { CalendarModule } from 'primeng/calendar'
import { InputTextModule } from 'primeng/inputtext'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { TooltipModule } from 'primeng/tooltip'

@Component({
  selector: 'app-information-recopilation',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    CalendarModule,
    TooltipModule
  ],
  templateUrl: './information-recopilation.component.html'
})
export class InformationRecopilationComponent {
  constructor(private router: Router) {}
  nextStep() {
    this.router.navigateByUrl('recopilations/steps-create/select-departments')
  }
  prevStep() {
    this.router.navigateByUrl('recopilations')
  }
}
