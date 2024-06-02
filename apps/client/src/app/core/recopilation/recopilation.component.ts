import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'app-recopilation',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './recopilation.component.html'
})
export class RecopilationComponent {
  constructor(private router: Router) {}
  navigateStepsCreate() {
    this.router.navigateByUrl(
      'recopilations/steps-create/information-recopilation'
    )
  }
}
