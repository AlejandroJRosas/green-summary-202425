import { Location } from '@angular/common'
import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [ButtonModule, RouterLink],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.css'
})
export class UnauthorizedComponent {
  constructor(private location: Location) {}

  goBackToPrevPage(): void {
    this.location.back()
  }
}
