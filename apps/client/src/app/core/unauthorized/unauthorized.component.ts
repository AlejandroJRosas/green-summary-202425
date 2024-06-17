import { Location } from '@angular/common'
import { Component } from '@angular/core'
import { LottieComponent, AnimationOptions } from 'ngx-lottie'
import { RouterLink } from '@angular/router'
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [LottieComponent, ButtonModule, RouterLink],
  templateUrl: './unauthorized.component.html'
})
export class UnauthorizedComponent {
  options: AnimationOptions = {
    path: '/assets/animations/unauthorized.json'
  }

  constructor(private location: Location) {}

  goBackToPrevPage(): void {
    this.location.back()
  }
}
