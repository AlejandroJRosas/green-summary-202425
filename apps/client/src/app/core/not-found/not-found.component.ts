import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { LottieComponent, AnimationOptions } from 'ngx-lottie'
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [LottieComponent, ButtonModule, RouterLink],
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent {
  options: AnimationOptions = {
    path: '/assets/animations/not-found.json'
  }
}
